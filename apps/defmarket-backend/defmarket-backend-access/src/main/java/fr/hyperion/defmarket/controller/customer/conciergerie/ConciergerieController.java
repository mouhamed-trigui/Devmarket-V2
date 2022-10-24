package fr.hyperion.defmarket.controller.customer.conciergerie;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.dto.request.conciergerie.ConciergerieMessageRequest;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.usecase.SendMessageConciergerieUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_CUSTOMER + "/conciergerie/")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_OFFER')")
@XSlf4j
public class ConciergerieController extends AbstractController {
    private final SendMessageConciergerieUseCase sendMessageConciergerieUseCase;

    @Operation(summary = "send Message ")
    @PostMapping("send-message")
    public ResponseEntity<Void> sendMessage(@RequestBody final ConciergerieMessageRequest sendMessageRequest,
                                            @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        sendMessageConciergerieUseCase.sendMessage(sendMessageRequest.message, Long.parseLong(jwt.getClaim("id")));
        return ResponseEntity.ok().build();
    }

}
