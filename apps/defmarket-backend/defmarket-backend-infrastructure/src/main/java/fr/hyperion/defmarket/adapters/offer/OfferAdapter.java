package fr.hyperion.defmarket.adapters.offer;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.file.DocumentAdapter;
import fr.hyperion.defmarket.adapters.offer.mapper.OfferDBMapper;
import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.DocumentDB;
import fr.hyperion.defmarket.database.entity.OfferDB;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.repository.DocumentRepository;
import fr.hyperion.defmarket.database.repository.OfferRepository;
import fr.hyperion.defmarket.database.repository.StoreRepository;
import fr.hyperion.defmarket.database.specification.OfferSpecification;
import fr.hyperion.defmarket.ports.offer.persistence.CreateOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetAllOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetNbOffersAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetNexOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOfferByIdAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOfferByNameAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOffersCountAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOneOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateFileOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateOfferByAdminAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdatePhotoOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.ValidateOfferModerationAdapter;
import fr.hyperion.defmarket.properties.DefmarketProperty;
import fr.hyperion.defmarket.service.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OfferAdapter implements CreateOfferAdapter, UpdateOfferAdapter, UpdatePhotoOfferAdapter,
    GetAllOfferAdapter, GetOneOfferAdapter, UpdateFileOfferAdapter, GetOfferByIdAdapter, UpdateOfferByAdminAdapter,
    ValidateOfferModerationAdapter, GetOfferByNameAdapter, GetOffersCountAdapter, GetNexOfferAdapter,
    GetNbOffersAdapter {
    private static final String OFFERS_FILES_PATH = "offers";
    private final DefmarketProperty defmarketProperty;

    private final OfferRepository offerRepository;
    private final OfferDBMapper offerDBMapper;
    private final DocumentDBMapper documentDBMapper;
    private final StoreRepository storeRepository;
    private final DocumentRepository documentRepository;
    private final DocumentAdapter documentAdapter;

    @Override
    @Transactional
    public Offer create(final Offer offer, final Long storeId) {
        final StoreDB storeDB = storeRepository.getReferenceById(storeId);
        final CompanyDB companyDB = storeDB.getCompany();
        final List<UserAccountDB> collect =
            companyDB.getUserCompanyList().stream().map(UserAccountCompanyDB::getUserAccount).distinct().toList();
        collect.forEach(userAccountDB -> userAccountDB.getCompleteRegistration().setOfferCompleted(true));

        OfferDB offerDB = offerDBMapper.toEntity(offer, storeDB);

        if (offer.getPhoto() != null) {
            final Document photoDocument = documentAdapter.saveAsPublic(offer.getPhoto(), OFFERS_FILES_PATH);
            DocumentDB photoDB = documentDBMapper.toEntity(photoDocument);
            photoDB = documentRepository.save(photoDB);
            offerDB.setPhoto(photoDB);
        } else {
            documentRepository.findById(2L).ifPresent(offerDB::setPhoto);
        }

        if (offer.getAttachedFile() != null) {
            final Document attachedFile = documentAdapter.saveAsPublic(offer.getAttachedFile(), OFFERS_FILES_PATH);
            DocumentDB attachedFileDB = documentDBMapper.toEntity(attachedFile);
            attachedFileDB = documentRepository.save(attachedFileDB);
            offerDB.setAttachedFile(attachedFileDB);
        }

        offerDB = offerRepository.save(offerDB);
        return offerDBMapper.toData(offerDB);
    }


    @Override
    @Transactional
    public Offer update(final Offer offer, final Long id) {
        OfferDB offerDB = offerRepository.getReferenceById(id);
        if (offerDB.isValidatedByAdmin() && offerDB.getModeration() == null) {
            offerDB.setModeration(offerDBMapper.toOfferModeration(offerDB));
        }
        final StoreDB storeDB = offerDB.getStore();
        offerDB = offerDBMapper.toEntity(offer, storeDB, offerDB);
        return offerDBMapper.toData(offerDB);
    }

    @Override
    @Transactional
    public Offer updateByAdmin(final Offer offer, final Long id) {
        final StoreDB storeDB = storeRepository.findByOfferList_Id(id);
        OfferDB offerDB = offerRepository.getReferenceById(id);
        offerDB = offerDBMapper.toEntity(offer, storeDB, offerDB);
        return offerDBMapper.toData(offerDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Offer> getAllByFilter(final Long storeId, final Pageable pageable, final AdminOfferFilter offerFilter) {
        final Specification<OfferDB> specification = Specification.where(OfferSpecification.notDeleted())
            .and(OfferSpecification.byStoreId(storeId))
            .and(OfferSpecification.byOfferType(offerFilter.getOfferType()))
            .and(OfferSpecification.byThemeType(offerFilter.getThemeType()))
            .and(OfferSpecification.byStatus(offerFilter.getStatus()))
            .and(OfferSpecification.byOfferCategory(offerFilter.getOfferCategory()))
            .and(OfferSpecification.isBlocked(offerFilter.getBlocked()))
            .and(OfferSpecification.validatedByAdmin(offerFilter.getValidated()))
            .and(OfferSpecification.hasModeration(offerFilter.getHasModeration()));
        final Page<OfferDB> allOffers = offerRepository.findAll(specification, pageable);
        return allOffers.map(offerDBMapper::toData);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Offer> getAll(final Long storeId, final Pageable pageable) {
        final Specification<OfferDB> specification = Specification.where(OfferSpecification.notDeleted()
            .and(OfferSpecification.byStoreId(storeId)));
        final Page<OfferDB> allOffers = offerRepository.findAll(specification, pageable);
        return allOffers.map(offerDBMapper::toData);
    }

    @Override
    @Transactional(readOnly = true)
    public Offer getById(final Long offerId) {
        final Specification<OfferDB> byID = Specification.where(OfferSpecification.byID(offerId))
            .and(OfferSpecification.notDeleted());
        final OfferDB getOneOffer = offerRepository.findOne(byID).orElseThrow();
        return offerDBMapper.toData(getOneOffer);
    }

    @Override
    @Transactional(readOnly = true)
    public Offer getOfferById(final Long offerId) {
        final OfferDB getOneOffer = offerRepository.getReferenceById(offerId);
        return offerDBMapper.toData(getOneOffer);
    }

    @Override
    @Transactional
    public Offer updatePhoto(final Document photo, final Long id) {
        final OfferDB offerDB = offerRepository.getReferenceById(id);
        if (offerDB.getPhoto() != null && offerDB.getPhoto().getId() >= 20) {
            documentAdapter.deleteFile(offerDB.getPhoto().getPath());
        }
        final Document newPhoto = documentAdapter.saveAsPublic(photo, OFFERS_FILES_PATH);
        if (offerDB.getPhoto() != null && offerDB.getPhoto().getId() >= 20) {
            documentDBMapper.toEntity(newPhoto, offerDB.getPhoto());
        } else {
            final DocumentDB documentDB = documentDBMapper.toEntity(newPhoto);
            documentRepository.save(documentDB);
            offerDB.setPhoto(documentDB);
        }
        return offerDBMapper.toData(offerDB);
    }

    @Override
    @Transactional
    public Offer updateAttachedFile(final Document attachedFile, final Long id) {
        final OfferDB offerDB = offerRepository.getReferenceById(id);
        if (offerDB.getAttachedFile() != null && offerDB.getAttachedFile().getId() >= 20) {
            documentAdapter.deleteFile(offerDB.getAttachedFile().getPath());
        }
        final Document newFile = documentAdapter.saveAsPublic(attachedFile, OFFERS_FILES_PATH);
        if (offerDB.getAttachedFile() != null && offerDB.getAttachedFile().getId() >= 20) {
            documentDBMapper.toEntity(newFile, offerDB.getAttachedFile());
        } else {
            final DocumentDB documentDB = documentDBMapper.toEntity(newFile);
            documentRepository.save(documentDB);
            offerDB.setAttachedFile(documentDB);
        }
        return offerDBMapper.toData(offerDB);
    }

    @Override
    @Transactional
    public void validateOfferModeration(final Long offerId) {
        final OfferDB offer = offerRepository.getReferenceById(offerId);
        offer.setModeration(null);
    }

    @Override
    @Transactional
    public Page<Offer> getOfferByName(final Pageable pageable, final String offerName) {
        final Page<OfferDB> result;
        if (offerName != null) {
            result = offerRepository.findByOfferByName(pageable, offerName);
        } else {
            final Specification<OfferDB> specification = OfferSpecification.notDeleted();
            result = offerRepository.findAll(specification, pageable);

        }
        return result.map(offerDBMapper::toData);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getOffersCount(final AdminOfferFilter offerFilter) {
        final Specification<OfferDB> specification =
            Specification.where(OfferSpecification.byOfferCategory(offerFilter.getOfferCategory()))
                .and(OfferSpecification.notDeleted())
                .and(OfferSpecification.byThemeType(offerFilter.getThemeType()))
                .and(OfferSpecification.byStatus(offerFilter.getStatus()))
                .and(OfferSpecification.byOfferType(offerFilter.getOfferType()))
                .and(OfferSpecification.isBlocked(offerFilter.getBlocked()))
                .and(OfferSpecification.validatedByAdmin(offerFilter.getValidated()))
                .and(OfferSpecification.hasModeration(offerFilter.getHasModeration()));
        return offerRepository.count(specification);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getNbOffers(final Long storeId) {
        final Specification<OfferDB> specification =
            Specification.where(OfferSpecification.notDeleted().and(OfferSpecification.byStoreId(storeId)));
        return offerRepository.count(specification);
    }

    @Override
    @Transactional(readOnly = true)
    public Offer getNextOffer(final Long currentOfferId, final AdminOfferFilter adminOfferFilter, final boolean desc) {
        final Specification<OfferDB> specification =
            Specification.where(OfferSpecification.isBlocked(adminOfferFilter.getBlocked()))
                .and(OfferSpecification.notDeleted())
                .and(OfferSpecification.validatedByAdmin(adminOfferFilter.getValidated()))
                .and(OfferSpecification.hasModeration(adminOfferFilter.getHasModeration()))
                .and(OfferSpecification.getNextOffer(currentOfferId, desc));
        final List<OfferDB> offerDBList = offerRepository.findAll(specification);

        OfferDB offerDB = null;
        if (offerDBList.size() > 0) {
            if (desc) {
                offerDB = offerDBList.get(offerDBList.size() - 1);
            } else {
                offerDB = offerDBList.get(0);
            }
        }
        if (offerDB == null) {
            throw new NotFoundException("Offer");
        }
        return offerDBMapper.toData(offerDB);
    }
}
