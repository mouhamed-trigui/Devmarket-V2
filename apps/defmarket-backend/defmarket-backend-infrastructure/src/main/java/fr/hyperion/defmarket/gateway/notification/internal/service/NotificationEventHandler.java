package fr.hyperion.defmarket.gateway.notification.internal.service;

import org.springframework.context.event.EventListener;
import org.springframework.http.HttpHeaders;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

import fr.hyperion.defmarket.gateway.event.notification.NotificationEventException;
import fr.hyperion.defmarket.gateway.notification.internal.model.NotificationEvent;
import fr.hyperion.defmarket.gateway.notification.internal.model.NotificationRequestResponse;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.XSlf4j;
import reactor.core.publisher.Mono;

@XSlf4j
@Component
@AllArgsConstructor
public class NotificationEventHandler {

	private static final String EXPO_BASE_URL = "https://api.expo.dev/v2";
	private static final String EXPO_PUSH_URL = "/push/send";

	private final WebClient webClient = WebClient.builder().filter(logrequest()).filter(logresponse())
			.filter(checkErrors()).baseUrl(EXPO_BASE_URL).build();

	@EventListener
	@SneakyThrows
	@Async
	public void handleEvent(final NotificationEvent auditEvent) {
		final HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json");
		headers.set("Accept-encoding", "gzip, deflate");
		headers.set("Content-Type", "application/json");
		final NotificationRequestResponse notificationRequestResponse = webClient.post().uri(EXPO_PUSH_URL)
				.headers(h -> h.addAll(headers)).bodyValue(auditEvent.getData()).retrieve()
				.bodyToMono(NotificationRequestResponse.class).block();
		log.info("sending data to security audit service : where id {} and status {}",
            notificationRequestResponse.getData().getId(), notificationRequestResponse.getData().getStatus());

	}

	private ExchangeFilterFunction checkErrors() {
		return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> clientResponse.bodyToMono(NotificationRequestResponse.class).flatMap(body -> {
        	if (body.getData().getStatus().contains("error")) {
        		throw new NotificationEventException(body.getData().getDetails().getError(),
        				body.getData().getMessage());
        	}
        	return Mono.just(clientResponse);
        }));
	}

	private ExchangeFilterFunction logresponse() {

		return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
			log.info("{}", clientResponse.statusCode());
			return Mono.just(clientResponse);
		});
	}

	private ExchangeFilterFunction logrequest() {
		return (clientRequest, next) -> {
			log.info("{}", clientRequest);
			clientRequest.headers().forEach((name, values) -> values.forEach(value -> log.info("{}:{}", name, value)));
			return next.exchange(clientRequest);
		};
	}
}
