package fr.hyperion.defmarket.adapters.store;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.file.DocumentAdapter;
import fr.hyperion.defmarket.adapters.store.mapper.StoreDBMapper;
import fr.hyperion.defmarket.adapters.timetable.mapper.TemporaryClosureDBMapper;
import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.common.mappers.GeolocationDBMapper;
import fr.hyperion.defmarket.common.mappers.PhoneDBMapper;
import fr.hyperion.defmarket.common.mappers.SocialMediaDBMapper;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.store.AdminStoreFilter;
import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;
import fr.hyperion.defmarket.data.store.StoreWithTimeTable;
import fr.hyperion.defmarket.data.store.TemporaryClosure;
import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.DocumentDB;
import fr.hyperion.defmarket.database.entity.PracticedOfferBeforeDMDB;
import fr.hyperion.defmarket.database.entity.StoreCategoryDB;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.TemporaryClosureDB;
import fr.hyperion.defmarket.database.entity.TimetableDB;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.repository.CompanyRepository;
import fr.hyperion.defmarket.database.repository.DocumentRepository;
import fr.hyperion.defmarket.database.repository.StoreCategoryRepository;
import fr.hyperion.defmarket.database.repository.StoreRepository;
import fr.hyperion.defmarket.database.specification.StoreSpecification;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.ports.file.persistence.DeleteFileAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetAllOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetNbOffersAdapter;
import fr.hyperion.defmarket.ports.store.persistence.CreateStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetAllLocalStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetAllStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetAllStoreWithFilterAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetNextStoresAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdWithOffersAndTimeTableAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByNameOrCityAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByUserIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoresCountAdapter;
import fr.hyperion.defmarket.ports.store.persistence.PracticedOfferBeforeDMUpdateAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateCoverStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateLogoStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreTemporaryClosureAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreVisibilityAdapter;
import fr.hyperion.defmarket.ports.store.persistence.ValidateStoreModerationAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.GetAllTimetableAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTraderByCompanyIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserAdapter;
import fr.hyperion.defmarket.service.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class StoreAdapter implements CreateStoreAdapter, UpdateLogoStoreAdapter, UpdateCoverStoreAdapter,
		UpdateStoreVisibilityAdapter, UpdateStoreAdapter, UpdateStoreTemporaryClosureAdapter, GetAllStoreAdapter,
		GetStoreByUserIdAdapter, PracticedOfferBeforeDMUpdateAdapter, GetStoreByIdAdapter, GetStoresCountAdapter,
		GetNextStoresAdapter, ValidateStoreModerationAdapter, GetAllStoreWithFilterAdapter, GetStoreByNameOrCityAdapter,
		GetAllLocalStoreAdapter, GetStoreByIdWithOffersAndTimeTableAdapter {
	private static final String UPLOAD_PATH = "%s/%s/";
	private final StoreRepository storeRepository;
	private final CompanyRepository companyRepository;
	private final StoreCategoryRepository storeCategoryRepository;

	private final GetTraderByCompanyIdAdapter getTraderByCompanyIdAdapter;
	private final DocumentAdapter documentAdapter;
	private final UpdateUserAdapter updateUserAdapter;
	private final GetAllOfferAdapter getAllOfferAdapter;
	private final GetAllTimetableAdapter getAllTimetableAdapter;
	private final GetNbOffersAdapter getNbOffersAdapter;

	private final StoreDBMapper storeDBMapper;
	private final DocumentDBMapper documentDBMapper;
	private final SocialMediaDBMapper socialMediaDBMapper;
	private final PhoneDBMapper phoneDBMapper;
	private final TemporaryClosureDBMapper temporaryClosureDBMapper;
	private final DocumentRepository documentRepository;
	private final DeleteFileAdapter deleteFileAdapter;
	private final GeolocationDBMapper geolocationDBMapper;

	@Override
	@Transactional
	public Store create(final Store store, final Long companyId) {

		final CompanyDB companyDB = companyRepository.getReferenceById(companyId);
		final Document logo = documentAdapter.saveAsPublic(store.getLogo(),
			UPLOAD_PATH.formatted(companyDB.getName(), store.getName()));

		final List<UserAccountDB> collect = companyDB.getUserCompanyList().stream()
				.map(UserAccountCompanyDB::getUserAccount).distinct().toList();
		collect.forEach(userAccountDB -> userAccountDB.getCompleteRegistration().setStoreValidated(true));

		StoreDB storeDB = storeDBMapper.toEntity(store, companyDB);
		if (store.getCover() != null) {
			final Document cover = documentAdapter.saveAsPublic(store.getCover(),
					UPLOAD_PATH.formatted(companyDB.getName(), store.getName()));
			DocumentDB coverDB = documentDBMapper.toEntity(cover);
			coverDB = documentRepository.save(coverDB);
			storeDB.setCover(coverDB);
		} else {
			documentRepository.findById(1L).ifPresent(storeDB::setCover);
		}

		if (logo != null) {
			DocumentDB logoDB = documentDBMapper.toEntity(logo);
			logoDB = documentRepository.save(logoDB);
			storeDB.setLogo(logoDB);
		}

		storeDB = storeRepository.save(storeDB);
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional
	public Store update(final Store store, final Long categoryId, final List<Long> socialMediaToRemove,
			final List<Long> phoneToRemove) {

		final StoreDB storeDB = storeRepository.getReferenceById(store.getId());
		if (store.isValidatedByAdmin() && storeDB.getModeration() == null) {
			storeDB.setModeration(storeDBMapper.toStoreModeration(storeDB));
		}
		if (!StringUtils.isBlank(store.getName()) && !StringUtils.isBlank(store.getDescription()) && categoryId != null
				&& hasActiveTimetable(storeDB)) {
			if ((store.getStoreType().equals(StoreTypeEnum.E_COMMERCE) && !store.isECommerceAndPhysicalStore()
					&& (store.getWebsite().isPublic() || store.getWebsite() != null))
					|| (store.getStoreType().equals(StoreTypeEnum.PHYSICAL) && !store.isECommerceAndPhysicalStore()
							&& store.getAddress() != null)
					|| (store.isECommerceAndPhysicalStore() && store.getAddress() != null
							&& (store.getWebsite().isPublic() || store.getWebsite() != null))) {
				final Operator user = (Operator) getTraderByCompanyIdAdapter
						.getTraderByCompanyId(storeDB.getCompany().getId());
				user.getCompleteRegistration().setStoreCompleted(true);
				updateUserAdapter.update(user);
			}
		}
		if (categoryId != null) {
			final StoreCategoryDB category = storeCategoryRepository.findById(categoryId).orElseThrow();
			storeDB.setStoreCategory(category);
		}
		storeDBMapper.toUpdate(store, storeDB);
		if (socialMediaToRemove != null && !socialMediaToRemove.isEmpty()) {
			socialMediaToRemove.forEach(socialMediaId -> storeDB.getSocialMedia().stream()
					.filter(socialMedia -> socialMedia.getId().equals(socialMediaId)).findFirst()
					.ifPresent(storeDB::removeSocialMedia));
		}
		socialMediaDBMapper.update(store.getSocialMedia(), storeDB);
		if (phoneToRemove != null && !phoneToRemove.isEmpty()) {
			phoneToRemove.forEach(phoneId -> storeDB.getPhoneList().stream()
					.filter(phone -> phone.getId().equals(phoneId)).findFirst().ifPresent(storeDB::removePhone));
		}
		phoneDBMapper.update(store.getPhoneList(), storeDB);

		return storeDBMapper.toData(storeDB);
	}

	private boolean hasActiveTimetable(final StoreDB storeDB) {
		return storeDB.getTimetableList().stream().anyMatch(TimetableDB::isActive);
	}

	@Override
	@Transactional
	public Store updateLogo(final Document logo, final Long storeId) {
		final StoreDB storeDB = storeRepository.getReferenceById(storeId);
		if (storeDB.getLogo() != null && storeDB.getLogo().getId() >= 20) {
			deleteFileAdapter.deleteFile(storeDB.getLogo().getPath());
		}
		final Document newLogo = documentAdapter.saveAsPublic(logo,
			UPLOAD_PATH.formatted(storeDB.getCompany().getName(), storeDB.getName()));
		if (storeDB.getLogo() != null && storeDB.getLogo().getId() >= 20) {
			documentDBMapper.toEntity(newLogo, storeDB.getLogo());
		} else {
			DocumentDB documentDB = documentDBMapper.toEntity(newLogo);
			documentDB = documentRepository.save(documentDB);
			storeDB.setLogo(documentDB);
		}
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional
	public Store updateCover(final Document cover, final Long id) {
		final StoreDB storeDB = storeRepository.getReferenceById(id);
		if (storeDB.getCover() != null && storeDB.getCover().getId() >= 20) {
			deleteFileAdapter.deleteFile(storeDB.getCover().getPath());
		}
		final Document newCover = documentAdapter.saveAsPublic(cover,
			UPLOAD_PATH.formatted(storeDB.getCompany().getName(), storeDB.getName()));
		if (storeDB.getCover() != null && storeDB.getCover().getId() >= 20) {
			documentDBMapper.toEntity(newCover, storeDB.getCover());
		} else {
			DocumentDB documentDB = documentDBMapper.toEntity(newCover);
			documentDB = documentRepository.save(documentDB);
			storeDB.setCover(documentDB);
		}
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional
	public Store updateVisibility(final Long storeId) {
		final StoreDB storeDB = storeRepository.findById(storeId).orElseThrow();
		storeDB.setVisible(!storeDB.isVisible());
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Store> getAll(final Long companyId) {
		final Specification<StoreDB> allByCompanyId = StoreSpecification.getByCompany(companyId)
				.and(StoreSpecification.notDeleted());
		final List<StoreDB> all = storeRepository.findAll(allByCompanyId);
		return storeDBMapper.toData(all);
	}

	@Override
	@Transactional(readOnly = true)
	public Store getByUserId(final Long userId) {
		final Specification<StoreDB> getFirstStore = StoreSpecification.getFirstStore(userId)
				.and(StoreSpecification.notDeleted());
		final StoreDB storeDB = storeRepository.findAll(getFirstStore).stream().findFirst().orElseThrow();
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional
	public Store updateTemporaryClosure(final Long storeId, final TemporaryClosure temporaryClosure) {
		final StoreDB storeDB = storeRepository.getReferenceById(storeId);
		if (storeDB.getTemporaryClosure() == null) {
			storeDB.setTemporaryClosure(new TemporaryClosureDB());
		}
		temporaryClosureDBMapper.update(temporaryClosure, storeDB.getTemporaryClosure());
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional
	public Store updatePracticedOfferBeforeDM(final Long id, final PracticedOfferBeforeDM practicedOfferBeforeDM) {
		final StoreDB storeDB = storeRepository.getReferenceById(id);
		if (storeDB.getPracticedOfferBeforeDM() == null) {
			storeDB.setPracticedOfferBeforeDM(new PracticedOfferBeforeDMDB());
		}
		storeDBMapper.update(practicedOfferBeforeDM, storeDB.getPracticedOfferBeforeDM());
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional(readOnly = true)
	public Store getStoreById(final Long storeId) {
		final Specification<StoreDB> byID = Specification.where(StoreSpecification.getByID(storeId))
				.and(StoreSpecification.notDeleted());
		final StoreDB storeDB = storeRepository.findOne(byID).orElseThrow();
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional(readOnly = true)
	public Store getStoreByIdToDelete(final Long storeId) {
		final Specification<StoreDB> byID = Specification.where(StoreSpecification.getByID(storeId));
		final StoreDB storeDB = storeRepository.findOne(byID).orElseThrow();
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional(readOnly = true)
	public Store getNextStore(final Long currentStoreId, final AdminStoreFilter adminStoreFilter, final boolean desc) {
		final Specification<StoreDB> specification = StoreSpecification.isBlocked(adminStoreFilter.getBlocked())
				.and(StoreSpecification.validatedByAdmin(adminStoreFilter.getValidated()))
				.and(StoreSpecification.hasModeration(adminStoreFilter.getHasModeration()))
				.and(StoreSpecification.notDeleted()).and(StoreSpecification.getNextStore(currentStoreId, desc));
		final List<StoreDB> storeDBList = storeRepository.findAll(specification);

		StoreDB storeDB = null;
		if (storeDBList.size() > 0) {
			if (desc) {
				storeDB = storeDBList.get(storeDBList.size() - 1);
			} else {
				storeDB = storeDBList.get(0);
			}
		}
		if (storeDB == null) {
			throw new NotFoundException("store");
		}
		return storeDBMapper.toData(storeDB);
	}

	@Override
	@Transactional(readOnly = true)
	public Long getStoresCount(final AdminStoreFilter adminStoreFilter) {
		final Specification<StoreDB> specification = Specification
				.where(StoreSpecification.validatedByAdmin(adminStoreFilter.getValidated()))
				.and(StoreSpecification.isBlocked(adminStoreFilter.getBlocked())).and(StoreSpecification.notDeleted())
				.and(StoreSpecification.hasModeration(adminStoreFilter.getHasModeration()));
		return storeRepository.count(specification);
	}

	@Override
	@Transactional
	public void validateStoreModeration(final Long storeId) {
		final StoreDB storeDB = storeRepository.getReferenceById(storeId);
		storeDB.setModeration(null);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Store> getAllByFilter(final Pageable pageable, final AdminStoreFilter storeFilter) {
		final Specification<StoreDB> specification = StoreSpecification.notDeleted()
				.and(StoreSpecification.hasModeration(storeFilter.getHasModeration()))
				.and(StoreSpecification.canBeValidated(storeFilter.getCanBeValidated()))
				.and(StoreSpecification.isBlocked(storeFilter.getBlocked()))
				.and(StoreSpecification.validatedByAdmin(storeFilter.getValidated()));
		final Page<StoreDB> allOffers = storeRepository.findAll(specification, pageable);
		return allOffers.map(storeDBMapper::toData);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Store> getStoreByNameOrCity(final Pageable pageable, final String input) {
		final Page<StoreDB> result;
		if (input != null) {
			result = storeRepository.findStoreByNameOrCity(pageable, input);
		} else {
			final Specification<StoreDB> specification = StoreSpecification.notDeleted();
			result = storeRepository.findAll(specification, pageable);
		}
		return result.map(storeDBMapper::toData);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<StoreWithTimeTable> getAllLocalStore(final Pageable pageable,
			final CustomerStoreFilter customerStoreFilter) {
        final Point point = geolocationDBMapper.toPoint(customerStoreFilter.getGeolocation());
        final Page<StoreDB> result = storeRepository.getTheDistanceFromOneStoreToAnother(pageable, point, customerStoreFilter.getDistance(), customerStoreFilter);
        return result.map(storeDBMapper::mapToStoreWithTimeTable);
    }

	@Transactional
	@Override
	public StoreWithOffersAndTimeTable getStoreByIdWithOffersAndTimeTable(final Long storeId) {
		final Store store = getStoreById(storeId);
		store.setOfferNbr(getNbOffersAdapter.getNbOffers(store.getId()).intValue());
		final List<Offer> offers = getAllOfferAdapter.getAll(storeId, Pageable.unpaged()).getContent();
		final List<Timetable> timetables = getAllTimetableAdapter.getAllTimetableOfStore(storeId, true);
		return storeDBMapper.mapToStoreWithOffersAndTimeTable(store, offers, timetables);

	}
}
