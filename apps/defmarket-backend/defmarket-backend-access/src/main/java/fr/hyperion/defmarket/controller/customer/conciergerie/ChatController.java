package fr.hyperion.defmarket.controller.customer.conciergerie;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import fr.hyperion.defmarket.dto.request.conciergerie.MessageRequest;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    public void send(@Payload final MessageRequest message) {
        simpMessagingTemplate.convertAndSend("/topic/messages", message);
    }
}
