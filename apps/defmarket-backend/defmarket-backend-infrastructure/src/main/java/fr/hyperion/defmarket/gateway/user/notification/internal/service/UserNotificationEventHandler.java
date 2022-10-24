package fr.hyperion.defmarket.gateway.user.notification.internal.service;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.adapters.notification.AdminHistoryNotificationAdapter;
import fr.hyperion.defmarket.adapters.notification.UserNotificationAdapter;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;
import fr.hyperion.defmarket.data.notification.UserNotification;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTextCompanyEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTextOfferEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTextStoreEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTextTraderEnum;
import fr.hyperion.defmarket.ports.company.persistence.GetOneCompanyAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOfferByIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTraderByCompanyIdAdapter;
import fr.hyperion.defmarket.utilitary.event.BlockActionCompanyEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionOfferEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionStoreEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionTraderEvent;
import fr.hyperion.defmarket.utilitary.event.CreateAdminHistoryNotificationEvent;
import fr.hyperion.defmarket.utilitary.event.CreateInternalNotificationEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteStoreByAdminEvent;
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
public class UserNotificationEventHandler {

    private final UserNotificationAdapter userNotificationAdapter;
    private final AdminHistoryNotificationAdapter adminHistoryNotificationAdapter;
    private final GetTraderByCompanyIdAdapter getTraderByCompanyIdAdapter;
    private final GetStoreByIdAdapter getStoreByIdAdapter;
    private final GetOfferByIdAdapter getOfferByIdAdapter;
    private final GetOneCompanyAdapter getOneCompanyAdapter;

    @EventListener
    @Async
    public void validateTraderNotification(final ValidateTraderEvent validateTraderEvent) {
        log.info("Notification of validateTraderEvent has been created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextTraderEnum.VALIDATED.getText())
            .iconType(IconTypeEnum.PROFILE)
            .build();
        userNotificationAdapter.create(userNotification, validateTraderEvent.getUserId());
    }

    @EventListener
    @Async
    public void updateTraderNotification(final UpdateIdentityEvent updateIdentityEvent) {
        log.info("Notification of updateIdentityEvent has been created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextTraderEnum.UPDATE.getText())
            .iconType(IconTypeEnum.PROFILE)
            .build();
        userNotificationAdapter.create(userNotification, updateIdentityEvent.getUser().getId());
    }

    @Async
    @EventListener
    public void blockActionTraderNotification(final BlockActionTraderEvent blockActionTraderEvent) {
        log.info("Notification of blockActionTraderEvent has been created...");
        final UserNotification userNotification;
        if (blockActionTraderEvent.isBlockAction()) {
            userNotification = UserNotification.builder()
                .message(NotifTextTraderEnum.BLOCKED.getText() + blockActionTraderEvent.getReason())
                .iconType(IconTypeEnum.PROFILE)
                .build();
        } else {
            userNotification = UserNotification.builder()
                .message(NotifTextTraderEnum.UNBLOCKED.getText())
                .iconType(IconTypeEnum.PROFILE)
                .build();
        }
        userNotificationAdapter.create(userNotification, blockActionTraderEvent.getUserId());
    }

    @Async
    @EventListener
    public void requestInfoNotification(final SendRequestInfoMailEvent sendRequestInfoMailEvent) {
        log.info("Notification of sendRequestInfoMailEvent created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextTraderEnum.REQUEST_INFO.getText())
            .iconType(IconTypeEnum.PROFILE)
            .build();
        userNotificationAdapter.create(userNotification, sendRequestInfoMailEvent.getUserId());
    }

    @EventListener
    @Async
    public void updateStoreNotification(final UpdateStoreByAdminEvent updateStoreByAdminEvent) {
        final Long companyId = updateStoreByAdminEvent.getStore().getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Notification of updateStoreByAdminEvent has been created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextStoreEnum.UPDATED.getText().formatted(updateStoreByAdminEvent.getStore().getName()))
            .iconType(IconTypeEnum.STORE)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @EventListener
    @Async
    public void deleteStoreByAdminNotification(final DeleteStoreByAdminEvent deleteStoreByAdminEvent) {
        final Store store = getStoreByIdAdapter.getStoreByIdToDelete(deleteStoreByAdminEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Notification of deleteStoreByAdminEvent has been created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextStoreEnum.DELETED.getText().formatted(store.getName()))
            .iconType(IconTypeEnum.STORE)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void blockActionStoreNotification(final BlockActionStoreEvent blockActionStoreEvent) {
        final Store store = getStoreByIdAdapter.getStoreById(blockActionStoreEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Notification of blockActionStoreEvent has been created...");
        final UserNotification userNotification;
        if (blockActionStoreEvent.isBlockAction()) {
            userNotification = UserNotification.builder()
                .message(NotifTextStoreEnum.BLOCKED.getText().formatted(store.getName()))
                .iconType(IconTypeEnum.STORE)
                .build();
        } else {
            userNotification = UserNotification.builder()
                .message(NotifTextStoreEnum.UNBLOCKED.getText().formatted(store.getName()))
                .iconType(IconTypeEnum.STORE)
                .build();
        }
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @EventListener
    @Async
    public void ValidateStoreByAdminNotification(final ValidateStoreByAdminEvent validateStoreByAdminEvent) {
        final Store store = getStoreByIdAdapter.getStoreById(validateStoreByAdminEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        log.info("Notification of validateStoreByAdminEvent has been created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextStoreEnum.VALIDATED.getText().formatted(store.getName()))
            .iconType(IconTypeEnum.STORE)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @EventListener
    @Async
    public void deleteOfferByAdminNotification(final DeleteOfferByAdminEvent deleteOfferByAdminEvent) {
        final Offer offer = getOfferByIdAdapter.getOfferById(deleteOfferByAdminEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Notification of deleteOfferByAdminEvent has been created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextOfferEnum.DELETED.getText().formatted(offer.getTitle()))
            .iconType(IconTypeEnum.OFFER)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void updateOfferByAdminNotification(final UpdateOfferByAdminEvent updateOfferByAdminEvent) {
        final Company company = updateOfferByAdminEvent.getOffer().getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Notification of updateOfferByAdminEvent has been created ...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextOfferEnum.UPDATED.getText().formatted(updateOfferByAdminEvent.getOffer().getTitle()))
            .iconType(IconTypeEnum.OFFER)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void blockActionOfferNotification(final BlockActionOfferEvent blockActionOfferEvent) {
        final Offer offer = getOfferByIdAdapter.getOfferById(blockActionOfferEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Notification of blockActionOfferEvent has been created ...");
        final UserNotification userNotification;
        if (blockActionOfferEvent.isBlockAction()) {
            userNotification = UserNotification.builder()
                .message(NotifTextOfferEnum.BLOCKED.getText().formatted(offer.getTitle(),
                    blockActionOfferEvent.getReason()))
                .iconType(IconTypeEnum.OFFER)
                .build();
        } else {
            userNotification = UserNotification.builder()
                .message(NotifTextOfferEnum.UNBLOCKED.getText().formatted(offer.getTitle(),
                    blockActionOfferEvent.getReason()))
                .iconType(IconTypeEnum.OFFER)
                .build();
        }
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void validateOfferByAdminNotification(final ValidateOfferByAdminEvent validateOfferByAdminEvent) {
        final Offer offer = getOfferByIdAdapter.getOfferById(validateOfferByAdminEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Notification of validateOfferByAdminEvent has been created...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextOfferEnum.VALIDATED.getText().formatted(offer.getTitle()))
            .iconType(IconTypeEnum.OFFER)
            .build();

        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void validateCompanyByAdminNotification(final ValidateCompanyByAdminEvent validateCompanyByAdminEvent) {
        final Company company = getOneCompanyAdapter.getById(validateCompanyByAdminEvent.getCompanyId());
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Notification of ValidateCompanyByAdminEvent has been created ...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextCompanyEnum.VALIDATED.getText().formatted(company.getName()))
            .iconType(IconTypeEnum.COMPANY)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void blockActionCompanyNotification(final BlockActionCompanyEvent blockActionCompanyEvent) {
        final Operator user =
            (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(blockActionCompanyEvent.getCompanyId());
        final Company company = getOneCompanyAdapter.getById(blockActionCompanyEvent.getCompanyId());
        log.info("Notification of blockActionCompanyEvent has been created ...");
        final UserNotification userNotification;
        if (blockActionCompanyEvent.isBlockAction()) {
            userNotification = UserNotification.builder()
                .message(NotifTextCompanyEnum.BLOCKED.getText().formatted(company.getName(),
                    blockActionCompanyEvent.getReason()))
                .iconType(IconTypeEnum.COMPANY)
                .build();
        } else {
            userNotification = UserNotification.builder()
                .message(NotifTextCompanyEnum.UNBLOCKED.getText().formatted(company.getName(),
                    blockActionCompanyEvent.getReason()))
                .iconType(IconTypeEnum.COMPANY)
                .build();
        }
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void deleteCompanyByAdminNotification(final DeleteCompanyByAdminEvent deleteCompanyByAdminEvent) {
        final Company company = getOneCompanyAdapter.getByIdEvenIsDeleted(deleteCompanyByAdminEvent.getCompanyId());
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        log.info("Notification of deleteCompanyByAdminEvent has been created ...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextCompanyEnum.DELETED.getText().formatted(company.getName()))
            .iconType(IconTypeEnum.COMPANY)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void UpdateCompanyByAdminNotification(final UpdateCompanyByAdminEvent updateCompanyByAdminEvent) {
        final Operator user =
            (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(updateCompanyByAdminEvent.getCompany().getId());
        log.info("Notification of updateCompanyByAdminEvent has been created ...");
        final UserNotification userNotification = UserNotification.builder()
            .message(NotifTextCompanyEnum.UPDATED.getText().formatted(updateCompanyByAdminEvent.getCompany().getName()))
            .iconType(IconTypeEnum.COMPANY)
            .build();
        userNotificationAdapter.create(userNotification, user.getId());
    }

    @Async
    @EventListener
    public void CreateNotification(final CreateInternalNotificationEvent createInternalNotificationEvent) {
        log.info("Notification has been created ...");
        final UserNotification userNotification = createInternalNotificationEvent.getUserNotification();
        userNotificationAdapter.create(userNotification, createInternalNotificationEvent.getOwnerId());

    }

    @Async
    @EventListener
    public void CreateByAdminNotification(final CreateAdminHistoryNotificationEvent createAdminHistoryNotificationEvent) {
        log.info("Admin history Notification has been created ...");
        final AdminHistoryNotification adminHistoryNotification = createAdminHistoryNotificationEvent.getAdminHistoryNotification();
        adminHistoryNotification.setStatus(createAdminHistoryNotificationEvent.getStatus());
        adminHistoryNotification.setIconType(createAdminHistoryNotificationEvent.getIconType());
        adminHistoryNotificationAdapter.create(adminHistoryNotification, createAdminHistoryNotificationEvent.getStoreCategoryId());
    }

}
