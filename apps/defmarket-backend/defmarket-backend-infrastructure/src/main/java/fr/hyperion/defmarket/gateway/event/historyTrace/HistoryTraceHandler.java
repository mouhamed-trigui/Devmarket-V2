package fr.hyperion.defmarket.gateway.event.historyTrace;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.adapters.historyTrace.HistoryTraceAdapter;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTraceCompanyEnum;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTraceOfferEnum;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTraceStoreEnum;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTraceTraderEnum;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;
import fr.hyperion.defmarket.ports.company.persistence.GetOneCompanyAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOfferByIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTraderByCompanyIdAdapter;
import fr.hyperion.defmarket.utilitary.event.BlockActionCompanyEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionOfferEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionStoreEvent;
import fr.hyperion.defmarket.utilitary.event.BlockActionTraderEvent;
import fr.hyperion.defmarket.utilitary.event.CreateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.CreateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.CreateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteTraderByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.SendRequestInfoMailEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateIdentityEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateTraderEvent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@AllArgsConstructor
public class HistoryTraceHandler {
    private HistoryTraceAdapter historyTraceAdapter;
    private GetTraderByCompanyIdAdapter getTraderByCompanyIdAdapter;
    private GetStoreByIdAdapter getStoreByIdAdapter;
    private GetOfferByIdAdapter getOfferByIdAdapter;
    private GetOneCompanyAdapter getOneCompanyAdapter;


    @Async
    @EventListener
    public void historyTraceRequestInfo(final SendRequestInfoMailEvent sendRequestInfoMailEvent) {
        log.info("Preparing to create history trace for request info mail");
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceTraderEnum.SEND_MORE_INFO_REQUEST.getDescription())
            .description(sendRequestInfoMailEvent.getMessage())
            .historyType(HistoryTypeEnum.HISTORY_TRACE_TRADER)
            .build();
        historyTraceAdapter.create(historyTrace, sendRequestInfoMailEvent.getUserId());
        log.info("HistoryTrace of sendRequestInfoMailEvent created...");
    }

    @EventListener
    @Async
    public void historyTraceValidateTrader(final ValidateTraderEvent validateTraderEvent) {
        log.info("Preparing to create history trace for validate trader");
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceTraderEnum.VALIDATED.getDescription())
            .historyType(HistoryTypeEnum.HISTORY_TRACE_TRADER)
            .build();
        historyTraceAdapter.create(historyTrace, validateTraderEvent.getUserId());
        log.info("HistoryTrace of validateTraderEvent has been created...");
    }

    @Async
    @EventListener
    public void historyTraceDeleteTrader(final DeleteTraderByAdminEvent deleteTraderByAdminEvent) {
        log.info("Preparing to create history trace for deleting a trader");
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceTraderEnum.DELETE_TRADER.getDescription())
            .historyType(HistoryTypeEnum.HISTORY_TRACE_TRADER)
            .build();
        historyTraceAdapter.create(historyTrace, deleteTraderByAdminEvent.getUserId());
        log.info("HistoryTrace of deleteTraderEvent created...");
    }

    @Async
    @EventListener
    public void historyTraceBlockActionTrader(final BlockActionTraderEvent blockActionTraderEvent) {
        log.info("Preparing to create history trace for blocking a trader");
        final HistoryTrace historyTrace;
        if (blockActionTraderEvent.isBlockAction()) {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceTraderEnum.BLOCK_TRADER.getDescription() + blockActionTraderEvent.getReason())
                .historyType(HistoryTypeEnum.HISTORY_TRACE_TRADER)
                .build();
        } else {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceTraderEnum.UNBLOCK_TRADER.getDescription() + blockActionTraderEvent.getReason())
                .historyType(HistoryTypeEnum.HISTORY_TRACE_TRADER)
                .build();
        }
        historyTraceAdapter.create(historyTrace, blockActionTraderEvent.getUserId());
        log.info("HistoryTrace of blockActionTraderEvent created...");
    }

    @Async
    @EventListener
    public void historyTraceUpdateIdentity(final UpdateIdentityEvent updateIdentityEvent) {
        log.info("Preparing to create history trace for updating the identity");
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceTraderEnum.UPDATE_IDENTITY_TRADER.getDescription())
            .historyType(HistoryTypeEnum.HISTORY_TRACE_TRADER)
            .build();
        historyTraceAdapter.create(historyTrace, updateIdentityEvent.getUser().getId());
        log.info("HistoryTrace of updateIdentityEvent created...");
    }

    @Async
    @EventListener
    public void historyTraceCreateStoreByAdmin(final CreateStoreByAdminEvent createStoreByAdminEvent) {
        log.info("Preparing to create history trace for creating a store");
        final Operator user =
            (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(createStoreByAdminEvent.getCompanyId());

        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceTraderEnum.UPDATE_IDENTITY_TRADER.getDescription())
            .historyType(HistoryTypeEnum.HISTORY_TRACE_TRADER)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of CreateStoreByAdmin created...");
    }

    @Async
    @EventListener
    public void historyTraceUpdateStoreByAdmin(final UpdateStoreByAdminEvent updateStoreByAdminEvent) {
        log.info("Preparing to create history trace for updating a store");
        final Long companyId = updateStoreByAdminEvent.getStore().getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceStoreEnum.UPDATED.getText().formatted(updateStoreByAdminEvent.getStore().getName()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_STORE)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of updateStoreByAdminEvent created...");
    }

    @Async
    @EventListener
    public void historyTraceDeleteStoreByAdmin(final DeleteStoreByAdminEvent deleteStoreByAdminEvent) {
        log.info("Preparing to create history trace for deleting a store");
        final Store store = getStoreByIdAdapter.getStoreByIdToDelete(deleteStoreByAdminEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceStoreEnum.DELETED.getText().formatted(store.getName()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_STORE)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of deleteStoreByAdminEvent created...");
    }

    @Async
    @EventListener
    public void historyTraceBlockActionStore(final BlockActionStoreEvent blockActionStoreEvent) {
        log.info("Preparing to create history trace for blocking a store");
        final Store store = getStoreByIdAdapter.getStoreById(blockActionStoreEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        final HistoryTrace historyTrace;
        if (blockActionStoreEvent.isBlockAction()) {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceStoreEnum.BLOCKED.getText().formatted(store.getName(),
                    blockActionStoreEvent.getReason()))
                .historyType(HistoryTypeEnum.HISTORY_TRACE_STORE)
                .build();
        } else {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceStoreEnum.UNBLOCKED.getText().formatted(store.getName(),
                    blockActionStoreEvent.getReason()))
                .historyType(HistoryTypeEnum.HISTORY_TRACE_STORE)
                .build();
        }
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of blockActionTraderEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceValidateStoreByAdmin(final ValidateStoreByAdminEvent validateStoreByAdminEvent) {
        log.info("Preparing to create history trace for validating a store");
        final Store store = getStoreByIdAdapter.getStoreById(validateStoreByAdminEvent.getStoreId());
        final Long companyId = store.getCompany().getId();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(companyId);
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceStoreEnum.VALIDATED.getText().formatted(store.getName()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_STORE)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of validateStoreByAdminEvent created...");
    }

    @Async
    @EventListener
    public void historyTraceCreateOfferByAdmin(final CreateOfferByAdminEvent createOfferByAdminEvent) {
        log.info("Preparing to create history trace for creating an offer");
        final Company company = createOfferByAdminEvent.getOffer().getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceOfferEnum.CREATED.getText().formatted(createOfferByAdminEvent.getOffer().getTitle()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_OFFER)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of createOfferByAdminEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceDeleteOfferByAdmin(final DeleteOfferByAdminEvent deleteOfferByAdminEvent) {
        log.info("Preparing to create history trace for deleting an offer");
        final Offer offer = getOfferByIdAdapter.getOfferById(deleteOfferByAdminEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceOfferEnum.DELETED.getText().formatted(offer.getTitle()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_OFFER)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of deleteOfferByAdminEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceUpdateOfferByAdmin(final UpdateOfferByAdminEvent updateOfferByAdminEvent) {
        log.info("Preparing to create history trace for updating an offer");
        final Company company = updateOfferByAdminEvent.getOffer().getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceOfferEnum.UPDATED.getText().formatted(updateOfferByAdminEvent.getOffer().getTitle()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_OFFER)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of updateOfferByAdminEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceBlockActionOffer(final BlockActionOfferEvent blockActionOfferEvent) {
        log.info("Preparing to create history trace for blocking an offer");
        final Offer offer = getOfferByIdAdapter.getOfferById(blockActionOfferEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        final HistoryTrace historyTrace;
        if (blockActionOfferEvent.isBlockAction()) {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceOfferEnum.BLOCKED.getText().formatted(offer.getTitle(),
                    blockActionOfferEvent.getReason()))
                .historyType(HistoryTypeEnum.HISTORY_TRACE_OFFER)
                .build();
        } else {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceOfferEnum.UNBLOCKED.getText().formatted(offer.getTitle(),
                    blockActionOfferEvent.getReason()))
                .historyType(HistoryTypeEnum.HISTORY_TRACE_OFFER)
                .build();
        }
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of blockActionOfferEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceValidateOfferByAdmin(final ValidateOfferByAdminEvent validateOfferByAdminEvent) {
        log.info("Preparing to create history trace for validating an offer");
        final Offer offer = getOfferByIdAdapter.getOfferById(validateOfferByAdminEvent.getOfferId());
        final Company company = offer.getStore().getCompany();
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceOfferEnum.VALIDATED.getText().formatted(offer.getTitle()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_OFFER)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of validateOfferByAdminEvent created...");
    }

    @Async
    @EventListener
    public void historyTraceCreateCompanyByAdmin(final CreateCompanyByAdminEvent createCompanyByAdminEvent) {
        log.info("Preparing to create history trace for creating a company");
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceCompanyEnum.CREATED.getText().formatted(createCompanyByAdminEvent.getCompany().getName()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_COMPANY)
            .build();

        historyTraceAdapter.create(historyTrace, createCompanyByAdminEvent.getOwnerId());
        log.info("HistoryTrace of createCompanyByAdminEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceValidateCompanyByAdmin(final ValidateCompanyByAdminEvent validateCompanyByAdminEvent) {
        log.info("Preparing to create history trace for validating a company");
        final Company company = getOneCompanyAdapter.getById(validateCompanyByAdminEvent.getCompanyId());
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceCompanyEnum.VALIDATED.getText().formatted(company.getName()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_COMPANY)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of ValidateCompanyByAdminEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceBlockActionCompany(final BlockActionCompanyEvent blockActionCompanyEvent) {
        log.info("Preparing to create history trace for blocking a company");
        final Operator user =
            (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(blockActionCompanyEvent.getCompanyId());
        final Company company = getOneCompanyAdapter.getById(blockActionCompanyEvent.getCompanyId());
        final HistoryTrace historyTrace;
        if (blockActionCompanyEvent.isBlockAction()) {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceCompanyEnum.BLOCKED.getText().formatted(company.getName()))
                .historyType(HistoryTypeEnum.HISTORY_TRACE_COMPANY)
                .build();
        } else {
            historyTrace = HistoryTrace.builder()
                .title(HistoryTraceCompanyEnum.UNBLOCKED.getText().formatted(company.getName()))
                .historyType(HistoryTypeEnum.HISTORY_TRACE_COMPANY)
                .build();
        }
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of blockActionCompanyEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceDeleteOfferByAdmin(final DeleteCompanyByAdminEvent deleteCompanyByAdminEvent) {
        log.info("Preparing to create history trace for deleting a company");
        final Company company = getOneCompanyAdapter.getByIdEvenIsDeleted(deleteCompanyByAdminEvent.getCompanyId());
        final Operator user = (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(company.getId());
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceCompanyEnum.DELETED.getText().formatted(company.getName()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_COMPANY)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of deleteCompanyByAdminEvent created ...");
    }

    @Async
    @EventListener
    public void historyTraceUpdateCompanyByAdmin(final UpdateCompanyByAdminEvent updateCompanyByAdminEvent) {
        log.info("Preparing to create history trace for updating a company");
        final Operator user =
            (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(updateCompanyByAdminEvent.getCompany().getId());
        final HistoryTrace historyTrace = HistoryTrace.builder()
            .title(HistoryTraceCompanyEnum.UPDATED.getText().formatted(updateCompanyByAdminEvent.getCompany().getName()))
            .historyType(HistoryTypeEnum.HISTORY_TRACE_COMPANY)
            .build();
        historyTraceAdapter.create(historyTrace, user.getId());
        log.info("HistoryTrace of updateCompanyByAdminEvent created ...");
    }
}
