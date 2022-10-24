package fr.hyperion.defmarket.controller.customer.offer.mapper;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.common.mapper.DocumentMapper;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.dto.response.offer.CustomerOfferResponse;
import fr.hyperion.defmarket.dto.response.offer.OfferResponse;

@Mapper(uses = DocumentMapper.class)
public interface OfferCustomerMapper {
    CustomerOfferResponse mapToCustomerOfferResponse(Offer offer);
    
	OfferResponse mapToOfferResponse(Offer offer);
}
