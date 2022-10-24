package fr.hyperion.defmarket.adapters.conciergerieUserAccount.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.conciergerieUserAccount.ConciergerieUserAccount;
import fr.hyperion.defmarket.data.conciergerieUserAccount.RegisterRequest;
import fr.hyperion.defmarket.database.entity.ConciergerieUserAccountDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;

@Mapper()
public abstract class ConciergerieUserAccountDBMapper {
    @Mapping(target = "id", source = "id")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "conciergerieUserAccountId", source = "conciergerie_user_account_id")
    @Mapping(target = "conversationId", source = "conversation_id")
    public abstract ConciergerieUserAccount toData(ConciergerieUserAccountDB conciergerieUserAccountDB);


    @Mapping(target = "conciergerie_user_account_id", source = "conciergerieUserAccountId")
    @Mapping(target = "password", source = "registerRequest.password")
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "conversation_id", ignore = true)
    public abstract ConciergerieUserAccountDB toEntity(RegisterRequest registerRequest, UserAccountDB userAccountDB, Long conciergerieUserAccountId);

}
