package fr.hyperion.defmarket.service.offer;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.ports.offer.persistence.CreateOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetAllOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOneOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateFileOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdatePhotoOfferAdapter;
import fr.hyperion.defmarket.ports.offer.useCase.BlockAllOfferActionUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.DeleteAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferDeleteUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferFactoryUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdateFileUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdatePhotoUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdateUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.ValidateAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.ValidateOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOfferByIdUseCase;
import fr.hyperion.defmarket.service.exceptions.FileException;
import fr.hyperion.defmarket.service.exceptions.OfferValueException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferFactoryUseCase, OfferDeleteUseCase, OfferUpdateUseCase,
    OfferUpdatePhotoUseCase, GetAllOfferUseCase, GetOfferByIdUseCase, OfferUpdateFileUseCase, BlockAllOfferActionUseCase,
    DeleteAllOfferUseCase, ValidateAllOfferUseCase, ValidateOfferUseCase {
    private static final String INVALID_MIN_OFFER_VALUE = "Invalid Min Offer Value";
    private static final String INVALID_MID_OFFER_VALUE = "Invalid Mid Offer Value";
    private static final String MIN_MID_MAX_OFFER_VALUE_ARE_NULL = "Min, Mid & Max Offer Value are null";

    private final CreateOfferAdapter createOfferAdapter;
    private final UpdateOfferAdapter updateOfferAdapter;
    private final UpdatePhotoOfferAdapter updatePhotoOfferAdapter;
    private final GetAllOfferAdapter getAllOfferAdapter;
    private final GetOneOfferAdapter getOneOfferAdapter;
    private final UpdateFileOfferAdapter updateFileOfferAdapter;

    @Override
    public Offer create(final Offer offer, final Long storeId) {
        if (offer.getMinOfferValue() == null && offer.getMidOfferValue() == null && offer.getMaxOfferValue() == null) {
            throw new OfferValueException(MIN_MID_MAX_OFFER_VALUE_ARE_NULL);
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.PERCENTAGE)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) <= 4 && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) <= 4 && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            } else {
                offer.setValidatedByAdmin(true);
            }
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.FLAT)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) < 1 && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) < 1 && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            } else {
                offer.setValidatedByAdmin(true);
            }
        }
        final Offer createdOffer = createOfferAdapter.create(offer, storeId);
        log.info("Offer id {} has been created ", createdOffer.getId());
        return createdOffer;
    }

    @Override
    public void delete(final Long id) {
        final Offer offer = getById(id);
        offer.setDeleted(true);
        update(offer, offer.getId());
        log.info("Offer with id  {} has been deleted", id);
    }

    @Override
    public Offer update(final Offer offer, final Long id) {
        if (offer.getMinOfferValue() == null && offer.getMidOfferValue() == null && offer.getMaxOfferValue() == null) {
            throw new OfferValueException(MIN_MID_MAX_OFFER_VALUE_ARE_NULL);
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.PERCENTAGE)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) <= 4 && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) <= 4 && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            } else {
                offer.setValidatedByAdmin(true);
            }
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.FLAT)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) < 1 && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) < 1 && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            } else {
                offer.setValidatedByAdmin(true);
            }
        }
        final Offer update = updateOfferAdapter.update(offer, id);
        log.info("Offer with id {} has been Updated", id);
        return update;
    }

    @Override
    public Offer updatePhoto(final Document document, final Long offerId) throws FileException {
        final Offer offer = updatePhotoOfferAdapter.updatePhoto(document, offerId);
        log.info("Image of the Offer with id {} has been updated", offerId);
        return offer;
    }


    @Override
    public Page<Offer> getAll(final Long storeId, final Pageable pageable, final AdminOfferFilter offerFilter) {
        return getAllOfferAdapter.getAllByFilter(storeId, pageable, offerFilter);
    }

    @Override
    public List<Offer> getAll(final Long storeId) {
        return getAllOfferAdapter.getAll(storeId, Pageable.unpaged()).getContent();
    }

    @Override
    public Offer getById(final Long offerId) {
        return getOneOfferAdapter.getById(offerId);
    }

    @Override
    public Offer updateAttachedFile(final Document document, final Long id) {
        final Offer offer = updateFileOfferAdapter.updateAttachedFile(document, id);
        log.info("AttachedFile of the Offer with id {} has been updated", id);
        return offer;
    }

    @Override
    public void blockAllOfferAction(final Long storeId, final Boolean blockAction) {
        final Page<Offer> offers = getAllOfferAdapter.getAll(storeId, Pageable.unpaged());
        final List<Offer> offerList = offers.getContent();
        for (final Offer offer : offerList) {
            offer.setBlocked(blockAction);
            updateOfferAdapter.update(offer, offer.getId());
            log.info("Offers with id {} has been {}", offer.getId(), blockAction ? "blocked" : "unblocked");
        }
    }

    @Override
    public void deleteAllOffer(final Long storeId) {
        final Page<Offer> offers = getAllOfferAdapter.getAll(storeId, Pageable.unpaged());
        final List<Offer> offerList = offers.getContent();
        for (final Offer offer : offerList) {
            offer.setDeleted(true);
            updateOfferAdapter.update(offer, offer.getId());
            log.info("offers id {} has been deleted", offer.getId());
        }
    }

    @Override
    public void validateAllOffer(final Long storeId) {
        final Page<Offer> offers = getAllOfferAdapter.getAll(storeId, Pageable.unpaged());
        final List<Offer> offerList = offers.getContent();
        for (final Offer offer : offerList) {
            offer.setValidatedByAdmin(true);
            updateOfferAdapter.update(offer, offer.getId());
            log.info("offers id {} has been validated", offer.getId());
        }
    }

    @Override
    public void validateOffer(final Long id) {
        final Offer offer = getOneOfferAdapter.getById(id);
        offer.setValidatedByAdmin(true);
        updateOfferAdapter.update(offer, offer.getId());
        log.info("Offer id {} has been validated", id);
    }

    public int getNumberOfOffers(final Long storeId) {
        return getAll(storeId).size();
    }
}

