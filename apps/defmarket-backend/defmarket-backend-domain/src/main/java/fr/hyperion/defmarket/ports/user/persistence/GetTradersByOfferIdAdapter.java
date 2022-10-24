package fr.hyperion.defmarket.ports.user.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.user.Operator;

public interface GetTradersByOfferIdAdapter {
    List<Operator> getUserByOfferId(Long offerId);
}
