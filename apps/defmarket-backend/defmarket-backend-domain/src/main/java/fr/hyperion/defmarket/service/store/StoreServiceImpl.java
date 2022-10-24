package fr.hyperion.defmarket.service.store;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.store.TemporaryClosure;
import fr.hyperion.defmarket.ports.geoapify.GetGeoLocationAdapter;
import fr.hyperion.defmarket.ports.offer.useCase.BlockAllOfferActionUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.DeleteAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.ValidateAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetNbOffersUseCase;
import fr.hyperion.defmarket.ports.store.persistence.CreateStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetAllStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByUserIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.PracticedOfferBeforeDMUpdateAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateCoverStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateLogoStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreTemporaryClosureAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreVisibilityAdapter;
import fr.hyperion.defmarket.ports.store.useCase.BlockAllStoreActionUseCase;
import fr.hyperion.defmarket.ports.store.useCase.DeleteAllStoreUseCase;
import fr.hyperion.defmarket.ports.store.useCase.PracticedOfferBeforeDMUpdateUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreDeleteUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreFactoryUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateCoverUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateLogoUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateTemporaryClosureUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateVisibilityUseCase;
import fr.hyperion.defmarket.ports.store.useCase.ValidateAllStoreUseCase;
import fr.hyperion.defmarket.ports.store.useCase.ValidateStoreUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetAllStoreOfCompanyUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetByStoreIdUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByIdUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByUserIdUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreFactoryUseCase, StoreUpdateUseCase, StoreUpdateLogoUseCase,
		StoreUpdateCoverUseCase, StoreDeleteUseCase, GetStoreByIdUseCase, GetAllStoreOfCompanyUseCase,
		GetStoreByUserIdUseCase, StoreUpdateVisibilityUseCase, StoreUpdateTemporaryClosureUseCase,
		BlockAllStoreActionUseCase, PracticedOfferBeforeDMUpdateUseCase, DeleteAllStoreUseCase, ValidateStoreUseCase,
		ValidateAllStoreUseCase, GetByStoreIdUseCase {
	private final CreateStoreAdapter createStoreAdapter;
	private final UpdateStoreAdapter updateStoreAdapter;
	private final UpdateLogoStoreAdapter updateLogoStoreAdapter;
	private final UpdateCoverStoreAdapter updateCoverStoreAdapter;
	private final GetStoreByIdAdapter getStoreByIdAdapter;
	private final GetAllStoreAdapter getAllStoreAdapter;
	private final UpdateStoreVisibilityAdapter updateStoreVisibilityAdapter;
	private final GetStoreByUserIdAdapter getStoreByUserIdAdapter;
	private final PracticedOfferBeforeDMUpdateAdapter practicedOfferBeforeDMUpdateAdapter;
	private final UpdateStoreTemporaryClosureAdapter updateStoreTemporaryClosureAdapter;

	private final GetNbOffersUseCase getNbOffersUseCase;
	private final BlockAllOfferActionUseCase blockAllOfferActionUseCase;
	private final DeleteAllOfferUseCase deleteAllOfferUseCase;
	private final ValidateAllOfferUseCase validateAllOffer;
	private final GetGeoLocationAdapter getGeoLocationAdapter;

	@Override
	public Store create(final Store store, final Long companyId) {
		final Store createStore = createStoreAdapter.create(store, companyId);
		log.info("Store has been Created{}", store);
		return createStore;
	}

	@Override
	public Store update(final Store store, final Long categoryId, final Long storeId,
			final List<Long> socialMediaToRemove, final List<Long> phoneToRemove) {
		/*
		 * final GeoapifyCoordinates geoapifyCoordinates =
		 * getGeoLocationAdapter.getCoordinates(store.getAddress());
		 * store.setGeolocation(new Geolocation(geoapifyCoordinates.getLon(),
		 * geoapifyCoordinates.getLat()));
		 */
		updateStoreAdapter.update(store, categoryId, socialMediaToRemove, phoneToRemove);
		log.info("Store has been updated {}", store);
		return getById(storeId);
	}

	@Override
	public Store updateLogo(final Document logo, final Long storeId) throws IOException {
		final Store store = updateLogoStoreAdapter.updateLogo(logo, storeId);
		log.info("Logo of the Store id {} has been updated", storeId);
		return store;
	}

	@Override
	public Store updateCover(final Document cover, final Long id) throws IOException {
		final Store store = updateCoverStoreAdapter.updateCover(cover, id);
		log.info("Cover of the Store id {} has been updated", id);
		return store;
	}

	@Override
	public List<Store> getAll(final Long companyId) {
		final List<Store> allStores = getAllStoreAdapter.getAll(companyId);
		allStores.forEach(store -> store.setOfferNbr(getNbOffersUseCase.getNbOffers(store.getId()).intValue()));
		return allStores;
	}

	@Override
	public void delete(final Long id) {
		final Store store = getStoreByIdAdapter.getStoreById(id);
		store.setDeleted(true);
		final Long storeId = store.getId();
		final Long categoryId = store.getCategory() != null ? store.getCategory().getId() : null;
		updateStoreAdapter.update(store, categoryId, null, null);
		deleteAllOfferUseCase.deleteAllOffer(storeId);
		log.info("Store id {} has been deleted", id);
	}

	@Override
	public Store updateVisibility(final Long storeId) {
		final Store store = updateStoreVisibilityAdapter.updateVisibility(storeId);
		log.info("Visibility of the store with id {} has been updated", storeId);
		return store;
	}

	@Override
	public Store getFirstStoreByUserId(final Long userId) {
		final Store store = getStoreByUserIdAdapter.getByUserId(userId);
		store.setOfferNbr(getNbOffersUseCase.getNbOffers(store.getId()).intValue());
		return store;
	}

	@Override
	public Store updatePracticedOfferBeforeDM(final Long id, final PracticedOfferBeforeDM practicedOfferBeforeDM) {
		final Store store = practicedOfferBeforeDMUpdateAdapter.updatePracticedOfferBeforeDM(id,
				practicedOfferBeforeDM);
		log.info("PracticedOfferBeforeDM of the store with id {} has been updated", id);
		return store;
	}

	@Override
	public void blockAllStoreAction(final Long companyId, final Boolean blockAction) {
		final List<Store> stores = getAllStoreAdapter.getAll(companyId);
		for (final Store store : stores) {
			store.setBlocked(blockAction);
			final Long storeId = store.getId();
			final Long categoryId = store.getCategory() != null ? store.getCategory().getId() : null;
			updateStoreAdapter.update(store, categoryId, null, null);
			blockAllOfferActionUseCase.blockAllOfferAction(storeId, blockAction);
			log.info("Stores with id {} has been {}", storeId, blockAction ? "blocked" : "unblocked");

		}
	}

	@Override
	public Store updateTemporaryClosure(final Long storeId, final TemporaryClosure temporaryClosure) {
		final Store store = updateStoreTemporaryClosureAdapter.updateTemporaryClosure(storeId, temporaryClosure);
		log.info("TemporaryClosure of the store with id {} has been updated", storeId);
		return store;

	}

	@Override
	public void deleteAllStore(final Long companyId) {
		final List<Store> stores = getAllStoreAdapter.getAll(companyId);
		for (final Store store : stores) {
			store.setDeleted(true);
			final Long storeId = store.getId();
			final Long categoryId = store.getCategory() != null ? store.getCategory().getId() : null;
			updateStoreAdapter.update(store, categoryId, null, null);
			deleteAllOfferUseCase.deleteAllOffer(storeId);
		}
		log.info("All Stores of company with id {} has been deleted", companyId);
	}

	@Override
	public void validateAllStore(final Long companyId) {
		final List<Store> stores = getAllStoreAdapter.getAll(companyId);
		for (final Store store : stores) {
			store.setValidatedByAdmin(true);
			final Long storeId = store.getId();
			final Long categoryId = store.getCategory() != null ? store.getCategory().getId() : null;
			updateStoreAdapter.update(store, categoryId, null, null);
			validateAllOffer.validateAllOffer(storeId);
		}
		log.info("All Stores of company with id {} has been validated ", companyId);
	}

	@Override
	public void validateStore(final Long storeId) {
		final Store store = getStoreByIdAdapter.getStoreById(storeId);
		store.setValidatedByAdmin(true);
		final Long categoryId = store.getCategory() != null ? store.getCategory().getId() : null;
		updateStoreAdapter.update(store, categoryId, null, null);
		validateAllOffer.validateAllOffer(storeId);
		log.info("Store with id {} has been validated", storeId);
	}

	@Override
	public Store getById(final Long storeId) {
		final Store store = getStoreByIdAdapter.getStoreById(storeId);
		store.setOfferNbr(getNbOffersUseCase.getNbOffers(storeId).intValue());
		return store;
	}
}
