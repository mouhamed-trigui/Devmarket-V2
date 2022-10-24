package fr.hyperion.defmarket.adapters.conciergerieUserAccount;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import fr.hyperion.defmarket.adapters.conciergerieUserAccount.mapper.ConciergerieUserAccountDBMapper;
import fr.hyperion.defmarket.data.conciergerieUserAccount.AuthRequest;
import fr.hyperion.defmarket.data.conciergerieUserAccount.AuthResponse;
import fr.hyperion.defmarket.data.conciergerieUserAccount.ConciergerieUserAccount;
import fr.hyperion.defmarket.data.conciergerieUserAccount.CreateConversationResponse;
import fr.hyperion.defmarket.data.conciergerieUserAccount.GenericResponse;
import fr.hyperion.defmarket.data.conciergerieUserAccount.RegisterRequest;
import fr.hyperion.defmarket.data.conciergerieUserAccount.SendMessage;
import fr.hyperion.defmarket.data.conciergerieUserAccount.ValidateTokenResponse;
import fr.hyperion.defmarket.database.entity.ConciergerieUserAccountDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.repository.UserRepository;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence.CreateConciergerieUserAccountAdapter;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence.CreateConversationAdapter;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence.SendMessageConciergerieAdapter;
import fr.hyperion.defmarket.properties.DefmarketProperty;
import fr.hyperion.defmarket.service.exceptions.WebClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@RequiredArgsConstructor
public class ConciergerieUserAccountAdapter implements CreateConciergerieUserAccountAdapter, SendMessageConciergerieAdapter, CreateConversationAdapter {
    private final DefmarketProperty defmarketProperty;
    private WebClient webClient;
    private final ConciergerieUserAccountDBMapper conciergerieUserAccountDBMapper;
    private final UserRepository userRepository;
    private final ThreadLocal<String> authTokenLocal;
    private final static String webhook = "http://localhost:8080/api/customer/chat-webhook";

    @Override
    public ConciergerieUserAccount create(final RegisterRequest registerRequest, final Long userId) {
        final GenericResponse result = registerConciergerieUser(registerRequest);
        final Long conciergerieUserId = result.getData().getData().getUser_id();
        final String conversationId = createConversation();
        if ("success".equals(result.getResult())) {
            return createConciergerieUser(registerRequest, userId, conversationId, conciergerieUserId);
        } else {
            throw new WebClientException(result.getData().getMessage());
        }
    }

    @Transactional
    public ConciergerieUserAccount createConciergerieUser(final RegisterRequest registerRequest, final Long userId, final String conversationId, final Long conciergerieUserId) {
        final UserAccountDB userAccountDB = userRepository.findById(userId).orElseThrow();
        final ConciergerieUserAccountDB conciergerieUserAccountDB = conciergerieUserAccountDBMapper.toEntity(registerRequest, userAccountDB, conciergerieUserId);
        conciergerieUserAccountDB.setConversation_id(conversationId);
        userAccountDB.setConciergerieUserAccount(conciergerieUserAccountDB);
        userRepository.save(userAccountDB);
        return conciergerieUserAccountDBMapper.toData(conciergerieUserAccountDB);
    }

    private GenericResponse registerConciergerieUser(final RegisterRequest registerRequest) {
        validateToken();
        webClient = WebClient.builder().defaultHeaders(header -> header.setBearerAuth(authTokenLocal.get())).baseUrl(defmarketProperty.getClacDesDoigts().getCreateUserUrl()).build();
        final GenericResponse registerResponse = webClient.post().bodyValue(registerRequest).exchangeToMono((clientResponse) -> clientResponse.bodyToMono(GenericResponse.class)).block();
        return registerResponse;

    }

    private String getToken(final AuthRequest authRequest) {
        webClient = WebClient.builder().baseUrl(defmarketProperty.getClacDesDoigts().getAuthUrl()).build();
        final AuthResponse response = webClient.post().bodyValue(authRequest).exchangeToMono((clientResponse) -> clientResponse.bodyToMono(AuthResponse.class)).block();
        return response.getData().getToken();
    }

    private void validateToken() {
        final AuthRequest authRequest = new AuthRequest(defmarketProperty.getClacDesDoigts().getUserName(), defmarketProperty.getClacDesDoigts().getPassword());
        if (authTokenLocal.get() == null) {
            authTokenLocal.set(getToken(authRequest));
        } else {
            webClient = WebClient.builder().defaultHeaders(header -> header.setBearerAuth(authTokenLocal.get())).baseUrl(defmarketProperty.getClacDesDoigts().getValidateTokenUrl()).build();
            final ValidateTokenResponse response = webClient.post().exchangeToMono((clientResponse) -> clientResponse.bodyToMono(ValidateTokenResponse.class)).block();
            if (response.getResult().equals("error")) {
                authTokenLocal.set(getToken(authRequest));
            }
        }
    }

    @Override
    public String createConversation() {
        validateToken();
        webClient = WebClient.builder().defaultHeaders(header -> header.setBearerAuth(authTokenLocal.get())).baseUrl(defmarketProperty.getClacDesDoigts().getNewConversation()).build();
        final CreateConversationResponse createConversationResponse = webClient.post().bodyValue(webhook).exchangeToMono((clientResponse) -> clientResponse.bodyToMono(CreateConversationResponse.class)).block();
        return createConversationResponse.getReference();

    }

    @Override
    public String sendMessage(final String msg, final String reference) {
        validateToken();
        webClient = WebClient.builder().defaultHeaders(header -> header.setBearerAuth(authTokenLocal.get())).baseUrl(defmarketProperty.getClacDesDoigts().getNewConversation()).build();
        final SendMessage sendMessage = new SendMessage();
        sendMessage.setBody(msg);
        final GenericResponse sendMessageResponce = webClient.post().uri(reference + "/message").bodyValue(sendMessage).exchangeToMono((clientResponse) -> clientResponse.bodyToMono(GenericResponse.class)).block();
        return sendMessageResponce.getResult();

    }

}
