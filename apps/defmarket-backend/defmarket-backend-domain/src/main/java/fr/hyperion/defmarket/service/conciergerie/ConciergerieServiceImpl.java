package fr.hyperion.defmarket.service.conciergerie;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.conciergerieUserAccount.ConciergerieUserAccount;
import fr.hyperion.defmarket.data.conciergerieUserAccount.RegisterRequest;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence.CreateConciergerieUserAccountAdapter;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence.CreateConversationAdapter;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence.SendMessageConciergerieAdapter;
import fr.hyperion.defmarket.ports.conciergerieUserAccount.usecase.SendMessageConciergerieUseCase;
import fr.hyperion.defmarket.ports.user.persistence.GetOneUserAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class ConciergerieServiceImpl implements SendMessageConciergerieUseCase {

    private final CreateConciergerieUserAccountAdapter createConciergerieUserAccountAdapter;
    private final SendMessageConciergerieAdapter sendMessageConciergerieAdapter;
    private final CreateConversationAdapter createConversationAdapter;
    private final GetOneUserAdapter getOneUserAdapter;
    private final static String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_?";


    private ConciergerieUserAccount create(final Long userId) {
        final UserAccount userAccount = (UserAccount) getOneUserAdapter.getUserById(userId);
        final RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setFirstName(RandomStringUtils.random(8, characters));
        registerRequest.setLastName(RandomStringUtils.random(8, characters));
        registerRequest.setPassword(RandomStringUtils.random(15, characters));
        registerRequest.setEmail(userAccount.getEmail());
        registerRequest.setPhoneNumber(userAccount.getPhone().getPrefix() + userAccount.getPhone().getNumber());
        final ConciergerieUserAccount createConciergerieUserAccount = createConciergerieUserAccountAdapter.create(registerRequest, userId);
        if (createConciergerieUserAccount != null) {
            log.info("ConciergerieUserAccount id {} has been created", createConciergerieUserAccount.getConciergerieUserAccountId());
        }
        return createConciergerieUserAccount;
    }

    @Override
    public void sendMessage(final String message, final Long userId) {
        final UserAccount userAccount = (UserAccount) getOneUserAdapter.getUserById(userId);

        Long conciergerieUserId = null;
        String conversationId = null;
        if (userAccount.getConciergerieUserAccount() == null) {
            final ConciergerieUserAccount conciergerieUserAccount = create(userId);
            conciergerieUserId = conciergerieUserAccount.getConciergerieUserAccountId();
            conversationId = conciergerieUserAccount.getConversationId();
        }
        if (conciergerieUserId == null) {
            conversationId = createConversationAdapter.createConversation();
        }
        //sendMessageConciergerieAdapter.sendMessage(message, conversationId);
    }
}
