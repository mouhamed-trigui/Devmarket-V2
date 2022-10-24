package fr.hyperion.defmarket.service.offer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.ports.offer.persistence.CreateOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetNbOffersAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetNexOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOfferByIdAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOfferByNameAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOffersCountAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateOfferByAdminAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.ValidateOfferModerationAdapter;
import fr.hyperion.defmarket.ports.offer.useCase.BlockOfferActionByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.CreateOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.DeleteOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.UpdateOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.ValidateOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.ValidateOfferModerationUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetNbOffersUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetNexOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOfferByNameUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOffersCountUseCase;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import fr.hyperion.defmarket.service.exceptions.OfferValueException;
import fr.hyperion.defmarket.utilitary.event.BlockActionOfferEvent;
import fr.hyperion.defmarket.utilitary.event.CreateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateOfferByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class AdminOfferServiceImpl implements CreateOfferByAdminUseCase, DeleteOfferByAdminUseCase,
    UpdateOfferByAdminUseCase, ValidateOfferByAdminUseCase, BlockOfferActionByAdminUseCase, GetOffersCountUseCase,
    GetNexOfferUseCase, GetOfferByNameUseCase, ValidateOfferModerationUseCase, GetNbOffersUseCase {
    private static final String INVALID_MIN_OFFER_VALUE = "Invalid Min Offer Value";
    private static final String INVALID_MID_OFFER_VALUE = "Invalid Mid Offer Value";
    private static final String MIN_MID_MAX_OFFER_VALUE_ARE_NULL = "Min, Mid & Max Offer Value are null";

    private final GetOfferByNameAdapter getOfferByNameAdapter;
    private final CreateOfferAdapter createOfferAdapter;
    private final UpdateOfferByAdminAdapter UpdateOfferByAdminAdapter;
    private final GetOfferByIdAdapter getOfferByIdAdapter;
    private final ValidateOfferModerationAdapter validateOfferModerationAdapter;
    private final GetOffersCountAdapter getOffersCountAdapter;
    private final GetNexOfferAdapter getNexOfferAdapter;
    private final GetNbOffersAdapter getNbOffersAdapter;

    private final DateAndTimeUseCase dateAndTimeUseCase;

    private final EventPublisher eventPublisher;

    @Override
    public Offer createByAdmin(final Offer offer, final Long storeId) {
        if (offer.getMinOfferValue() == null && offer.getMidOfferValue() == null && offer.getMaxOfferValue() == null) {
            throw new OfferValueException(MIN_MID_MAX_OFFER_VALUE_ARE_NULL);
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.PERCENTAGE)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) <= 4
                && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) <= 4
                && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            }
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.FLAT)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) < 1
                && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) < 1
                && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            }
        }
        offer.setValidatedByAdmin(true);

        final Offer createdOffer = createOfferAdapter.create(offer, storeId);

        final CreateOfferByAdminEvent createOfferByAdminEvent = new CreateOfferByAdminEvent(createdOffer, storeId, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(createOfferByAdminEvent);
        log.info("Offer with id {} has been created by admin", createdOffer.getId());

        return createdOffer;
    }

    @Override
    public void deleteByAdmin(final Long id) {
        final Offer offer = getOfferByIdAdapter.getOfferById(id);
        offer.setDeleted(true);
        updateByAdmin(offer, offer.getId());
        final DeleteOfferByAdminEvent deleteOfferByAdminEvent = new DeleteOfferByAdminEvent(id, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(deleteOfferByAdminEvent);
        log.info("Offer with id  {} has been deleted by admin", id);

    }

    @Override
    public Offer updateByAdmin(final Offer offer, final Long id) {
        if (offer.getMinOfferValue() == null && offer.getMidOfferValue() == null && offer.getMaxOfferValue() == null) {
            throw new OfferValueException(MIN_MID_MAX_OFFER_VALUE_ARE_NULL);
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.PERCENTAGE)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) <= 4
                && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) <= 4
                && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            }
        } else if (offer.getOfferType() != null && offer.getOfferType().equals(OfferTypeEnum.FLAT)) {
            if (offer.getMinOfferValue() != null && Double.parseDouble(offer.getMinOfferValue()) < 1
                && Double.parseDouble(offer.getMinOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MIN_OFFER_VALUE);
            } else if (offer.getMinOfferValue() == null && Double.parseDouble(offer.getMidOfferValue()) < 1
                && Double.parseDouble(offer.getMidOfferValue()) >= 0) {
                throw new OfferValueException(INVALID_MID_OFFER_VALUE);
            }
        }
        offer.setValidatedByAdmin(true);

        final UpdateOfferByAdminEvent updateOfferByAdminEvent = new UpdateOfferByAdminEvent(offer, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(updateOfferByAdminEvent);
        final Offer updateByAdmin = UpdateOfferByAdminAdapter.updateByAdmin(offer, id);
        log.info("Offer with id {} has been Updated by admin", id);

        return updateByAdmin;
    }

    @Override
    public void blockOfferActionByAdmin(final Long offerId, final Boolean blockAction, final String reason) {
        final Offer offer = getOfferByIdAdapter.getOfferById(offerId);
        offer.setBlocked(blockAction);
        UpdateOfferByAdminAdapter.updateByAdmin(offer, offer.getId());
        final BlockActionOfferEvent blockActionOfferEvent = new BlockActionOfferEvent(offerId, reason, blockAction,
            this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(blockActionOfferEvent);
        log.info("Offers with id {} has been {} by admin", offerId, blockAction ? "blocked" : "unblocked");
    }

    @Override
    public void validateOfferByAdmin(final Long offerId) {
        final Offer offer = getOfferByIdAdapter.getOfferById(offerId);
        offer.setValidatedByAdmin(true);
        UpdateOfferByAdminAdapter.updateByAdmin(offer, offer.getId());
        final ValidateOfferByAdminEvent validateOfferByAdminEvent = new ValidateOfferByAdminEvent(offerId, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(validateOfferByAdminEvent);
        log.info("Offer id {} has been validated by admin", offerId);
    }

    @Override
    public void validateOfferModeration(final Long offerId) {
        validateOfferModerationAdapter.validateOfferModeration(offerId);
    }

    @Override
    public Page<Offer> getOfferByName(final Pageable pageable, final String offerName) {
        return getOfferByNameAdapter.getOfferByName(pageable, offerName);
    }

    @Override
    public Long getOffersCount(final AdminOfferFilter offerFilter) {
        return getOffersCountAdapter.getOffersCount(offerFilter);
    }

    @Override
    public Offer getNextOffer(final Long currentOfferId, final AdminOfferFilter adminOfferFilter, final boolean desc) {
        return getNexOfferAdapter.getNextOffer(currentOfferId, adminOfferFilter, desc);
    }

    @Override
    public Long getNbOffers(final Long storeId) {
        return getNbOffersAdapter.getNbOffers(storeId);
    }
}
