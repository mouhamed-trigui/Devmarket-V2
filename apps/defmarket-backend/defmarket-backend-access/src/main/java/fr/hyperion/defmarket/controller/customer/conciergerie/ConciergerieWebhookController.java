package fr.hyperion.defmarket.controller.customer.conciergerie;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.XSlf4j;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_CUSTOMER + "/conciergerie-webhook")
@XSlf4j
public class ConciergerieWebhookController extends AbstractController {

    @Operation(summary = "Create chat")
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody final String payload) {
        log.info("ChatWebhookPayload= {}", payload);
        return ResponseEntity.ok().build();
    }

}
