package fr.hyperion.defmarket.service.store;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import fr.hyperion.defmarket.data.store.AdminStoreFilter;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.ports.offer.useCase.BlockAllOfferActionUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.DeleteAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetNbOffersUseCase;
import fr.hyperion.defmarket.ports.store.persistence.CreateStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetAllStoreWithFilterAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetNextStoresAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByNameOrCityAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoresCountAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.ValidateStoreModerationAdapter;
import fr.hyperion.defmarket.ports.store.useCase.BlockStoreByAdminActionUseCase;
import fr.hyperion.defmarket.ports.store.useCase.CreateStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.DeleteStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.UpdateStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.ValidateStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.ValidateStoreModerationUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetAllStoreWithFilterUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetNextStoresUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByNameOrCityUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoresCountUseCase;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import fr.hyperion.defmarket.utilitary.event.BlockActionStoreEvent;
import fr.hyperion.defmarket.utilitary.event.CreateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateStoreByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class StoreAdminServiceImpl implements CreateStoreByAdminUseCase, UpdateStoreByAdminUseCase,
    DeleteStoreByAdminUseCase, ValidateStoreByAdminUseCase, BlockStoreByAdminActionUseCase, GetNextStoresUseCase,
    GetStoresCountUseCase, ValidateStoreModerationUseCase, GetAllStoreWithFilterUseCase, GetStoreByNameOrCityUseCase {

    private final GetStoreByNameOrCityAdapter getStoreByNameOrCityAdapter;
    private final CreateStoreAdapter createStoreAdapter;
    private final UpdateStoreAdapter updateStoreAdapter;
    private final GetStoreByIdAdapter getStoreByIdAdapter;
    private final ValidateStoreModerationAdapter validateStoreModerationAdapter;
    private final GetAllStoreWithFilterAdapter getAllStoreWithFilterAdapter;
    private final GetStoresCountAdapter getStoresCountAdapter;
    private final GetNextStoresAdapter getNextStoresAdapter;
    private final GetNbOffersUseCase getNbOffersUseCase;

    private final BlockAllOfferActionUseCase blockAllOfferActionUseCase;
    private final DeleteAllOfferUseCase deleteAllOfferUseCase;
    private final DateAndTimeUseCase dateAndTimeUseCase;

    private final EventPublisher eventPublisher;

    @Override
    public Store createByAdmin(final Store store, final Long companyId) {
        Assert.isNull(store.getId(), "You cannot create a store with this specific ID.");
        store.setValidatedByAdmin(true);
        final Store storeDB = createStoreAdapter.create(store, companyId);
        final CreateStoreByAdminEvent createStoreByAdminEvent = new CreateStoreByAdminEvent(store, companyId, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(createStoreByAdminEvent);
        log.info("Store id {} has been Created by admin", store.getId());
        return storeDB;
    }

    @Override
    public Store updateByAdmin(final Store store, final Long categoryId, final List<Long> socialMediaToRemove, final List<Long> phoneToRemove) {
        Assert.isTrue(store.getId() > 0L, "Please specify the ID of the company you want to update.");
        updateStoreAdapter.update(store, categoryId, socialMediaToRemove, phoneToRemove);
        final UpdateStoreByAdminEvent updateStoreByAdminEvent = new UpdateStoreByAdminEvent(store, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(updateStoreByAdminEvent);
        final Store storeById = getStoreByIdAdapter.getStoreById(store.getId());
        log.info("Store with id {} has been updated by admin", store.getId());
        return storeById;
    }

    @Override
    public void deleteByAdmin(final Long storeId) {
        final Store store = getStoreByIdAdapter.getStoreById(storeId);
        store.setDeleted(true);
        updateStoreAdapter.update(store, store.getCategory() == null ? null : store.getCategory().getId(), null, null);
        deleteAllOfferUseCase.deleteAllOffer(storeId);
        final DeleteStoreByAdminEvent deleteStoreByAdminEvent = new DeleteStoreByAdminEvent(storeId, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(deleteStoreByAdminEvent);
        log.info("Store with id {} has been deleted by admin", storeId);
    }

    @Override
    public void blockStoreAction(final Long storeId, final Boolean blockAction, final String reason) {
        final Store store = getStoreByIdAdapter.getStoreById(storeId);
        store.setBlocked(blockAction);
        updateStoreAdapter.update(store, store.getCategory() == null ? null : store.getCategory().getId(), null, null);
        blockAllOfferActionUseCase.blockAllOfferAction(storeId, blockAction);
        final BlockActionStoreEvent blockActionStoreEvent = new BlockActionStoreEvent(storeId, reason, blockAction,
            this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(blockActionStoreEvent);
        log.info("Store with id {} has been {} by admin", storeId, blockAction ? "blocked" : "unblocked");
    }

    @Override
    public void validateStoreByAdmin(final Long storeId) {
        final Store store = getStoreByIdAdapter.getStoreById(storeId);
        store.setValidatedByAdmin(true);
        final Long categoryId = store.getCategory() != null ? store.getCategory().getId() : null;
        updateStoreAdapter.update(store, categoryId, null, null);
        final ValidateStoreByAdminEvent validateStoreByAdminEvent = new ValidateStoreByAdminEvent(storeId, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(validateStoreByAdminEvent);
        log.info("Store with id {} has been validated by admin", storeId);
    }

    @Override
    public Store getNextStore(final Long currentStoreId, final AdminStoreFilter adminStoreFilter, final boolean desc) {
        return getNextStoresAdapter.getNextStore(currentStoreId, adminStoreFilter, desc);
    }

    @Override
    public Long getStoresCount(final AdminStoreFilter adminStoreFilter) {
        return getStoresCountAdapter.getStoresCount(adminStoreFilter);
    }

    @Override
    public Page<Store> getStoreByNameOrCity(final Pageable pageable, final String input) {
        return getStoreByNameOrCityAdapter.getStoreByNameOrCity(pageable, input);
    }

    @Override
    public void validateStoreModeration(final Long offerId) {
        validateStoreModerationAdapter.validateStoreModeration(offerId);
    }

    @Override
    public Page<Store> getAll(final Pageable pageable, final AdminStoreFilter storeFilter) {

        final Page<Store> allStore = getAllStoreWithFilterAdapter.getAllByFilter(pageable, storeFilter);
        allStore.forEach(store -> store.setOfferNbr(getNbOffersUseCase.getNbOffers(store.getId()).intValue()));
        return allStore;
    }
}
