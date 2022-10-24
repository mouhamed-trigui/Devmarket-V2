package fr.hyperion.defmarket.controller.customer.conciergerie.mapper;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.conciergerieUserAccount.ConciergerieUserAccount;
import fr.hyperion.defmarket.dto.response.conciergerie.ConciergerieUserAccountResponse;


@Mapper()
public interface ConciergerieCustomerMapper {
    ConciergerieUserAccountResponse mapToConciergerie(ConciergerieUserAccount conciergerieUserAccount);
}
