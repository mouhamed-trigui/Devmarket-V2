package fr.hyperion.defmarket.gateway.mail.internal.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.enumerated.JwtEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.enumerated.mail.MailTextCompanyEnum;
import fr.hyperion.defmarket.enumerated.mail.MailTextOfferEnum;
import fr.hyperion.defmarket.enumerated.mail.MailTextStoreEnum;
import fr.hyperion.defmarket.enumerated.mail.MailTextTraderEnum;
import fr.hyperion.defmarket.ports.company.persistence.GetOneCompanyAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOfferByIdAdapter;
import fr.hyperion.defmarket.ports.redirection.useCase.AddNewRedirectionMapperUserCase;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.user.gateway.DefmarketPropertyGateway;
import fr.hyperion.defmarket.ports.user.mail.EmailData;
import fr.hyperion.defmarket.ports.user.persistence.GetOneUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTraderByCompanyIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTradersByOfferIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetUserByEmailAdapter;
import fr.hyperion.defmarket.utilitary.event.BlockActionCompanyEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionOfferEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionStoreEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionTraderEvent;
import fr.hyperion.defmarket.utilitary.event.CreateTraderByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteTraderByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ForgetPasswordEvent;
import fr.hyperion.defmarket.utilitary.event.RequestChangePasswordEvent;
import fr.hyperion.defmarket.utilitary.event.RequestDeleteTraderEvent;
import fr.hyperion.defmarket.utilitary.event.SendEmailToChangeEmailEvent;
import fr.hyperion.defmarket.utilitary.event.SendEmailWithTokenEvent;
import fr.hyperion.defmarket.utilitary.event.SendRequestInfoMailEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateIdentityEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateTraderEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@RequiredArgsConstructor
public class EmailEventHandler {

    private final GetOneUserAdapter getOneUserAdapter;
    private final GetTraderByCompanyIdAdapter getTraderByCompanyIdAdapter;
    private final GetStoreByIdAdapter getStoreByIdAdapter;
    private final GetOfferByIdAdapter getOfferByIdAdapter;
    private final GetOneCompanyAdapter getOneCompanyAdapter;
    private final GetTradersByOfferIdAdapter getTradersByOfferIdAdapter;
    private final GetUserByEmailAdapter getUserByEmailAdapter;

    private final DefmarketPropertyGateway defmarketPropertyGateway;
    private final AddNewRedirectionMapperUserCase addNewRedirectionMapperUseCase;
    private final TemplateEngine templateEngine;


    private static final String NOREPLY_ADDRESS = "contact@operationhyperion.com";
    private final JavaMailSender emailSender;

    @Async
    @EventListener
    public void sendRequestInfoMailEvent(final SendRequestInfoMailEvent sendRequestInfoMailEvent) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(sendRequestInfoMailEvent.getUserId());
        log.info("Preparing to send email request more info to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("subject", sendRequestInfoMailEvent.getSubject());
        context.setVariable("message", sendRequestInfoMailEvent.getMessage());
        final String message = templateEngine.process("emails/requestInfoEmail", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(sendRequestInfoMailEvent.getSubject())
            .message(message)
            .build();

        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email Request more Info has been send: {}", sendRequestInfoMailEvent);
    }

    @Async
    @EventListener
    public void deleteTraderEvent(final DeleteTraderByAdminEvent deleteTraderByAdminEvent) {
        log.info("Preparing to send email delete account to {}", deleteTraderByAdminEvent.getEmail());
        final Context context = getContext();
        if (deleteTraderByAdminEvent.getFirstName() != null) {
            context.setVariable("firstName", deleteTraderByAdminEvent.getFirstName());
        }

        final String message = templateEngine.process("emails/deleteTrader", context);
        final EmailData emailData = EmailData.builder()
            .to(deleteTraderByAdminEvent.getEmail())
            .subject(MailTextTraderEnum.DELETED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of deleteTraderEvent has been send...");
    }

    @Async
    @EventListener
    public void requestDeleteTraderEvent(final RequestDeleteTraderEvent requestDeleteTraderEvent) {
        log.info("Preparing to send email request delete account to {}", requestDeleteTraderEvent.getUser().getEmail());
        final Context context = getContext();
        if (requestDeleteTraderEvent.getUser().getFirstName() != null) {
            context.setVariable("firstName", requestDeleteTraderEvent.getUser().getFirstName());
        }

        final String message = templateEngine.process("emails/requestdeleteTrader", context);
        final EmailData emailData = EmailData.builder()
            .to(requestDeleteTraderEvent.getUser().getEmail())
            .subject(MailTextTraderEnum.REQUESTDELETE.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of RequestDeleteTraderEvent has been send...");
    }

    @Async
    @EventListener
    public void sendEmailWithToken(final SendEmailWithTokenEvent sendEmailWithTokenEvent) {
        log.info("Preparing to send email with token to {}", sendEmailWithTokenEvent.getEmail());
        final DefmarketUser user = getUserByEmailAdapter.getUserByEmail(sendEmailWithTokenEvent.getEmail(),
            UserTypeEnum.TRADER);
        final String link =
            addNewRedirectionMapperUseCase.addNewRedirectionMapper(user.getId(), JwtEnum.JWT_VALIDATE_EMAIL);
        final Context context = getContext();
        context.setVariable("link", link);

        final String message = templateEngine.process("emails/sendEmailWithToken", context);
        final EmailData emailData = EmailData.builder()
            .to(sendEmailWithTokenEvent.getEmail())
            .subject(MailTextTraderEnum.SENDEMAILWITHTOKEN.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of sendEmailWithToken has been send...");
    }

    @Async
    @EventListener
    public void sendEmailForgetPassword(final ForgetPasswordEvent forgetPasswordEvent) {
        log.info("Preparing to send email forget password to {}", forgetPasswordEvent.getEmail());
        final DefmarketUser user = getUserByEmailAdapter.getUserByEmail(forgetPasswordEvent.getEmail(),
            UserTypeEnum.TRADER);
        final String link =
            addNewRedirectionMapperUseCase.addNewRedirectionMapper(user.getId(), forgetPasswordEvent.getJwtRole());
        final Context context = getContext();
        context.setVariable("link", link);

        final String message = templateEngine.process("emails/forgetPassword", context);
        final EmailData emailData = EmailData.builder()
            .to(forgetPasswordEvent.getEmail())
            .subject(MailTextTraderEnum.FORGETPASSWORD.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of sendEmailForgetPassword has been send...");
    }

    @Async
    @EventListener
    public void sendEmailCreateTraderByAdmin(final CreateTraderByAdminEvent createTraderByAdminEvent) {
        log.info("Preparing to send email create trader by admin to {}", createTraderByAdminEvent.getEmail());
        final DefmarketUser user = getUserByEmailAdapter.getUserByEmail(createTraderByAdminEvent.getEmail(),
            UserTypeEnum.TRADER);
        final String link =
            addNewRedirectionMapperUseCase.addNewRedirectionMapper(user.getId(), createTraderByAdminEvent.getJwtRole());
        final Context context = getContext();
        context.setVariable("mail", user.getEmail());
        context.setVariable("link", link);

        final String message = templateEngine.process("emails/createTraderByAdmin", context);
        final EmailData emailData = EmailData.builder()
            .to(createTraderByAdminEvent.getEmail())
            .subject(MailTextTraderEnum.CREATEBYADMIN.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of create trader by admin has been send...");
    }

    @Async
    @EventListener
    public void sendEmailToChangeEmailEvent(final SendEmailToChangeEmailEvent sendEmailToChangeEmailEvent) {
        log.info("Preparing to send email to change email to {}", sendEmailToChangeEmailEvent.getUser().getEmail());
        final String link =
            addNewRedirectionMapperUseCase.addNewRedirectionMapper(sendEmailToChangeEmailEvent.getUser().getId(),
                JwtEnum.JWT_CHANGE_EMAIL);
        final Context context = getContext();
        context.setVariable("link", link);

        if (sendEmailToChangeEmailEvent.getUser().getFirstName() != null) {
            context.setVariable("firstName", sendEmailToChangeEmailEvent.getUser().getFirstName());
        }
        final String message = templateEngine.process("emails/requestChangeEmail", context);
        final EmailData emailData = EmailData.builder()
            .to(sendEmailToChangeEmailEvent.getUser().getEmail())
            .subject(MailTextTraderEnum.REQUESTCHNAGEEMAIL.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email for request change e-mail has been send...");
    }

    @Async
    @EventListener
    public void validateTraderEventEmail(final ValidateTraderEvent validateTraderEvent) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(validateTraderEvent.getUserId());
        log.info("Preparing to send email validate trader to {}", user.getEmail());
        final Context context = getContext();

        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }
        final String message = templateEngine.process("emails/validateTrader", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextTraderEnum.VALIDATED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of validateTraderEvent has been send ...");
    }

    @Async
    @EventListener
    public void blockActionTraderEmail(final BlockActionTraderEvent blockActionTraderEvent) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(blockActionTraderEvent.getUserId());
        log.info("Preparing to send an email to inform the user that their account has been blocked to {}", user.getEmail());
        final EmailData emailData;
        if (blockActionTraderEvent.isBlockAction()) {
            final Context context = getContext();
            if (user.getFirstName() != null) {
                context.setVariable("firstName", user.getFirstName());
            }
            final String message = templateEngine.process("emails/blockTrader", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextTraderEnum.BLOCKED.getSubject())
                .message(message)
                .build();
        } else {
            final Context context = getContext();
            if (user.getFirstName() != null) {
                context.setVariable("firstName", user.getFirstName());
            }

            final String message = templateEngine.process("emails/unblockTrader", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextTraderEnum.UNBLOCKED.getSubject())
                .message(message)
                .build();
        }
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), emailData.getMessage());
        log.info("Email of blockActionTraderEvent has been send... ");
    }

    @Async
    @EventListener
    public void updateStoreByAdminEventEmail(final UpdateStoreByAdminEvent updateStoreByAdminEvent) {
        final Long companyId = updateStoreByAdminEvent.getStore().getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Preparing to send email update store by admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("storeName", updateStoreByAdminEvent.getStore().getName());
        final String message = templateEngine.process("emails/updateStore", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextStoreEnum.UPDATED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of updateStoreByAdminEvent has been send... ");
    }

    @Async
    @EventListener
    public void deleteStoreByAdminEventEmail(final DeleteStoreByAdminEvent deleteStoreByAdminEvent) {
        final Store store = getStoreByIdAdapter.getStoreByIdToDelete(deleteStoreByAdminEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Preparing to send email delete store by admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("storeName", store.getName());
        final String message = templateEngine.process("emails/deleteStore", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextStoreEnum.DELETED.getSubject().formatted(store.getName()))
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of deleteStoreByAdminEvent has been send... ");
    }

    @Async
    @EventListener
    public void blockActionStoreEmail(final BlockActionStoreEvent blockActionStoreEvent) {
        final Store store = getStoreByIdAdapter.getStoreById(blockActionStoreEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Preparing to send an email to inform the user that their account has been blocked to {}", user.getEmail());
        final EmailData emailData;
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("storeName", store.getName());
        if (blockActionStoreEvent.isBlockAction()) {
            context.setVariable("reason", blockActionStoreEvent.getReason());
            final String message = templateEngine.process("emails/blockStore", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextStoreEnum.BLOCKED.getSubject().formatted(store.getName()))
                .message(message)
                .build();
        } else {
            final String message = templateEngine.process("emails/unblockStore", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextStoreEnum.UNBLOCKED.getSubject())
                .message(message)
                .build();
        }
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), emailData.getMessage());
        log.info("Email of blockActionStoreEvent has been send... ");
    }

    @Async
    @EventListener
    public void blockActionOfferEmail(final BlockActionOfferEvent blockActionOfferEvent) {
        final Offer offer = getOfferByIdAdapter.getOfferById(blockActionOfferEvent.getOfferId());
        final Operator user =
            (Operator) getTradersByOfferIdAdapter.getUserByOfferId(blockActionOfferEvent.getOfferId());
        log.info("Preparing to send an email to inform the user that their account has been blocked to {}", user.getEmail());
        final EmailData emailData;
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("offerName", offer.getTitle());
        if (blockActionOfferEvent.isBlockAction()) {
            context.setVariable("reason", blockActionOfferEvent.getReason());
            final String message = templateEngine.process("emails/blockOffer", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextStoreEnum.BLOCKED.getSubject())
                .message(message)
                .build();
        } else {
            final String message = templateEngine.process("emails/unblockOffer", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextStoreEnum.UNBLOCKED.getSubject())
                .message(message)
                .build();
        }
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), emailData.getMessage());
        log.info("Email of blockActionOfferEvent has been send... ");
    }

    @Async
    @EventListener
    public void validateStoreByAdminEventEmail(final ValidateStoreByAdminEvent validateStoreByAdminEvent) {
        final Store store = getStoreByIdAdapter.getStoreById(validateStoreByAdminEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Preparing to send an email to inform the user that his store has been validated by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("storeName", store.getName());
        final String message = templateEngine.process("emails/validateStore", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextStoreEnum.VALIDATED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of validateStoreByAdminEvent has been send... ");
    }

    @EventListener
    @Async
    public void deleteOfferByAdminEmail(final DeleteOfferByAdminEvent deleteOfferByAdminEvent) {
        final Offer offer = getOfferByIdAdapter.getOfferById(deleteOfferByAdminEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Preparing to send an email to inform the user that his offer has been deleted by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }
        context.setVariable("offerTitle", offer.getTitle());

        final String message = templateEngine.process("emails/deleteOffer", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextOfferEnum.DELETED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of deleteOfferByAdminEvent has been as been send : ");
    }

    @Async
    @EventListener
    public void updateOfferByAdminEmail(final UpdateOfferByAdminEvent updateOfferByAdminEvent) {
        final Company company = updateOfferByAdminEvent.getOffer().getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Preparing to send an email to inform the user that his offer has been updated by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }
        context.setVariable("offerTitle", updateOfferByAdminEvent.getOffer().getTitle());

        final String message = templateEngine.process("emails/updateOffer", context);
        final EmailData emailData =
            EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextOfferEnum.UPDATED.getSubject())
                .message(message)
                .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("email of updateOfferByAdminEvent has been send...");
    }

    @Async
    @EventListener
    public void updateTraderByAdminEmail(final UpdateIdentityEvent updateIdentityEvent) {
        log.info("Preparing to send an email to inform the user that his identity has been updated by the admin to {}", updateIdentityEvent.getUser().getEmail());
        final Context context = getContext();
        if (updateIdentityEvent.getUser().getFirstName() != null) {
            context.setVariable("firstName", updateIdentityEvent.getUser().getFirstName());
        }

        final String message = templateEngine.process("emails/updateTrader", context);
        final EmailData emailData =
            EmailData.builder()
                .to(updateIdentityEvent.getUser().getEmail())
                .subject(MailTextOfferEnum.UPDATED.getSubject())
                .message(message)
                .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("email of updateTraderByAdminEvent has been send...");
    }

    @Async
    @EventListener
    public void validateOfferByAdminEmail(final ValidateOfferByAdminEvent validateOfferByAdminEvent) {
        final Offer offer = getOfferByIdAdapter.getOfferById(validateOfferByAdminEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Preparing to send an email to inform the user that his offer has been validated by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }
        context.setVariable("offerTitle", offer.getTitle());

        final String message = templateEngine.process("emails/valideOffer", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextOfferEnum.VALIDATED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), emailData.getMessage());
        log.info("Email of validateOfferByAdminEvent has been send...");
    }

    @Async
    @EventListener
    public void validateCompanyByAdminEmail(final ValidateCompanyByAdminEvent validateCompanyByAdminEvent) {
        final Company company = getOneCompanyAdapter.getById(validateCompanyByAdminEvent.getCompanyId());
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Preparing to send an email to inform the user that his company has been validated by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("companyName", company.getName());
        final String message = templateEngine.process("emails/validateCompany", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextCompanyEnum.VALIDATED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of ValidateCompanyByAdminEvent has been send...");
    }

    private Context getContext() {
        final Context context = new Context();
        context.setVariable("instagram", defmarketPropertyGateway.hostname() + "/api/files/public/bytes/6");
        context.setVariable("linkedin", defmarketPropertyGateway.hostname() + "/api/files/public/bytes/7");
        context.setVariable("facebook", defmarketPropertyGateway.hostname() + "/api/files/public/bytes/5");
        context.setVariable("flag", defmarketPropertyGateway.hostname() + "/api/files/public/bytes/4");
        context.setVariable("logo", defmarketPropertyGateway.hostname() + "/api/files/public/bytes/3");
        context.setVariable("hostName", defmarketPropertyGateway.hostname());
        return context;
    }

    @Async
    @EventListener
    public void BlockActionCompanyEmail(final BlockActionCompanyEvent blockActionCompanyEvent) {
        final Operator user =
            (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(blockActionCompanyEvent.getCompanyId());
        log.info("Preparing to send an email to inform the user that his company has been blocked by the admin to {}", user.getEmail());
        final Company company = getOneCompanyAdapter.getById(blockActionCompanyEvent.getCompanyId());
        final EmailData emailData;
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("companyName", company.getName());
        if (blockActionCompanyEvent.isBlockAction()) {
            context.setVariable("reason", blockActionCompanyEvent.getReason());
            final String message = templateEngine.process("emails/blockCompany", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextCompanyEnum.BLOCKED.getSubject())
                .message(message)
                .build();
        } else {
            final String message = templateEngine.process("emails/unblockCompany", context);
            emailData = EmailData.builder()
                .to(user.getEmail())
                .subject(MailTextCompanyEnum.UNBLOCKED.getSubject())
                .message(message)
                .build();
        }
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), emailData.getMessage());
        log.info("Email of blockActionCompanyEvent as been send ...");
    }

    @Async
    @EventListener
    public void deleteCompanyByAdminEmail(final DeleteCompanyByAdminEvent deleteCompanyByAdminEvent) {
        final Company company = getOneCompanyAdapter.getByIdEvenIsDeleted(deleteCompanyByAdminEvent.getCompanyId());
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Preparing to send an email to inform the user that his company has been deleted by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("companyName", company.getName());
        final String message = templateEngine.process("emails/deleteCompany", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextCompanyEnum.DELETED.getSubject().formatted(company.getName()))
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of deleteCompanyByAdminEvent as been send ...");
    }

    @Async
    @EventListener
    public void changePasswordByAdminEmail(final RequestChangePasswordEvent requestChangePasswordEvent) {
        final DefmarketUser user = getUserByEmailAdapter.getUserByEmail(requestChangePasswordEvent.getEmail(), null);
        log.info("Preparing to send an email to inform the user that his password has been changed by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        final String message = templateEngine.process("emails/changePassword", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextTraderEnum.CHNAGEPASSWORD.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of Request change password has been send...");
    }

    @Async
    @EventListener
    public void UpdateCompanyByAdminEmail(final UpdateCompanyByAdminEvent updateCompanyByAdminEvent) {
        final Operator user =
            (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(updateCompanyByAdminEvent.getCompany().getId());
        log.info("Preparing to send an email to inform the user that his company has been updated by the admin to {}", user.getEmail());
        final Context context = getContext();
        if (user.getFirstName() != null) {
            context.setVariable("firstName", user.getFirstName());
        }

        context.setVariable("companyName", updateCompanyByAdminEvent.getCompany().getName());
        final String message = templateEngine.process("emails/updateCompany", context);
        final EmailData emailData = EmailData.builder()
            .to(user.getEmail())
            .subject(MailTextCompanyEnum.UPDATED.getSubject())
            .message(message)
            .build();
        sendSimpleMessage(emailData.getTo(), emailData.getSubject(), message);
        log.info("Email of updateCompanyByAdminEvent as been send ...");
    }

    private void sendSimpleMessage(final String to, final String subject,
                                   final String text) {

        final MimeMessage mimeMessage = emailSender.createMimeMessage();
        final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        try {
            helper.setFrom(NOREPLY_ADDRESS);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            emailSender.send(mimeMessage);

        } catch (final MessagingException e) {
            log.error("Error sending mail", e);
        } finally {
            log.info("Sending mail completed !!!!");
        }
    }
}
