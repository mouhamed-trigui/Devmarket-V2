package fr.hyperion.defmarket.controller.user.mapper;

import java.util.Collection;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.security.core.GrantedAuthority;

import fr.hyperion.defmarket.common.mapper.AddressMapper;
import fr.hyperion.defmarket.common.mapper.PhoneMapper;
import fr.hyperion.defmarket.controller.pro.company.mapper.CompanyMapper;
import fr.hyperion.defmarket.controller.pro.job.mapper.JobMapper;
import fr.hyperion.defmarket.data.UserDocument;
import fr.hyperion.defmarket.data.user.Admin;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.dto.request.user.AdminCreationRequest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationByAdminRequest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationInitRequest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationRequest;
import fr.hyperion.defmarket.dto.request.user.TraderUpdateRequest;
import fr.hyperion.defmarket.dto.request.user.UpdateTraderRequest;
import fr.hyperion.defmarket.dto.response.user.DocumentsResponse;
import fr.hyperion.defmarket.dto.response.user.UpdateTraderResponse;
import fr.hyperion.defmarket.dto.response.user.UserBasicResponse;
import fr.hyperion.defmarket.dto.response.user.UserResponse;
import fr.hyperion.defmarket.dto.response.user.UserWithCompanyListResponse;


@Mapper(uses = {AddressMapper.class, PhoneMapper.class, JobMapper.class, CompanyMapper.class})
public interface UserMapper {

    @Mapping(target = "crispId", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "validatedInfoByAdmin", ignore = true)
    @Mapping(target = "userType", ignore = true)
    @Mapping(target = "newEmail", ignore = true)
    @Mapping(target = "contacts", ignore = true)
    @Mapping(target = "contacts.phone", ignore = true)
    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "expoTokens", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "completeRegistration", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "expired", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "pushNotificationActive", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "mailValidated", ignore = true)
    @Mapping(target = "knowUsThroughOtherValue", ignore = true)
    @Mapping(target = "knowUsThrough", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "activity", ignore = true)
    @Mapping(target = "veteran", ignore = true)
    @Mapping(target = "deleteRequestDate", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "moreInfoRequestedByAdmin", ignore = true)
    @Mapping(target = "communication", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    @Mapping(target = "address.city", source = "residenceCity")
    Operator operatorToEntity(TraderUpdateRequest traderUpdateRequest, @MappingTarget Operator user);

    @Mapping(target = "crispId", ignore = true)
    @Mapping(target = "knowUsThroughOtherValue", ignore = true)
    @Mapping(target = "knowUsThrough", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "validatedInfoByAdmin", ignore = true)
    @Mapping(target = "newEmail", ignore = true)
    @Mapping(target = "deleteRequestDate", ignore = true)
    @Mapping(target = "userType", ignore = true)
    @Mapping(target = "expoTokens", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "completeRegistration", ignore = true)
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "expired", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "pushNotificationActive", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "mailValidated", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "moreInfoRequestedByAdmin", ignore = true)
    @Mapping(target = "password", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "email", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "communication", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    Operator traderToEntity(UpdateTraderRequest updateTraderRequest, @MappingTarget Operator user);

    @Mapping(target = "crispId", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "validatedInfoByAdmin", ignore = true)
    @Mapping(target = "newEmail", ignore = true)
    @Mapping(target = "deleteRequestDate", ignore = true)
    @Mapping(target = "userType", ignore = true)
    @Mapping(target = "expoTokens", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "completeRegistration", ignore = true)
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "expired", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "pushNotificationActive", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "mailValidated", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "moreInfoRequestedByAdmin", ignore = true)
    @Mapping(target = "birthCity", ignore = true)
    @Mapping(target = "communication", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    Operator operatorToEntity(OperatorCreationRequest operatorCreationRequest, @MappingTarget Operator user);

    @Mapping(target = "crispId", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "validatedInfoByAdmin", ignore = true)
    @Mapping(target = "newEmail", ignore = true)
    @Mapping(target = "deleteRequestDate", ignore = true)
    @Mapping(target = "userType", ignore = true)
    @Mapping(target = "phone", ignore = true)
    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "expoTokens", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "completeRegistration", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "expired", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "pushNotificationActive", ignore = true)
    @Mapping(target = "mailValidated", ignore = true)
    @Mapping(target = "lastName", ignore = true)
    @Mapping(target = "knowUsThroughOtherValue", ignore = true)
    @Mapping(target = "knowUsThrough", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "birthday", ignore = true)
    @Mapping(target = "veteran", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "activity", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "birthCity", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    @Mapping(target = "moreInfoRequestedByAdmin", ignore = true)
    @Mapping(target = "communication", ignore = true)
    Operator toOperatorEntity(OperatorCreationInitRequest operatorCreationInitRequest);

    @Mapping(target = "crispId", ignore = true)
    @Mapping(target = "newEmail", ignore = true)
    @Mapping(target = "deleteRequestDate", ignore = true)
    @Mapping(target = "userType", ignore = true)
    @Mapping(target = "expoTokens", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "completeRegistration", ignore = true)
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "expired", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "pushNotificationActive", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "mailValidated", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "validatedInfoByAdmin", ignore = true)
    @Mapping(target = "moreInfoRequestedByAdmin", ignore = true)
    @Mapping(target = "birthCity", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "knowUsThrough", ignore = true)
    @Mapping(target = "knowUsThroughOtherValue", ignore = true)
    @Mapping(target = "communication", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    Operator operatorToEntity(OperatorCreationByAdminRequest operatorCreationByAdminRequest);

    @Mapping(target = "validatedInfoByAdmin", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "userType", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "pushNotificationActive", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "moreInfoRequestedByAdmin", ignore = true)
    @Mapping(target = "mailValidated", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "expoTokens", ignore = true)
    @Mapping(target = "expired", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "deleteRequestDate", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    Admin toAdminEntity(AdminCreationRequest adminCreationRequest);

    @Mapping(target = "residenceCity", source = "address.city")
    @Mapping(target = "roles", source = "authorities", qualifiedByName = "getRoles")
    UserResponse toResponse(Operator user);


    @Mapping(target = "crispId", ignore = true)
    @Mapping(target = "roles", source = "authorities", qualifiedByName = "getRoles")
    UserBasicResponse toResponse(Admin user);

    @Mapping(target = "residenceCity", source = "address.city")
    @Mapping(target = "roles", source = "authorities", qualifiedByName = "getRoles")
    UserWithCompanyListResponse toResponse(OperatorWithCompanies user);

    @Named("getRoles")
    default List<String> getRoles(final Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream().map(GrantedAuthority::getAuthority).toList();
    }

    UpdateTraderResponse toTraderResponse(Operator user);

    List<UserResponse> toResponse(List<Operator> user);

    DocumentsResponse toDocumentsResponse(UserDocument document);

    default UserBasicResponse toResponse(final DefmarketUser user) {
        if (user instanceof Operator trader) {
            return toResponse(trader);
        } else if (user instanceof Admin admin) {
            return toResponse(admin);
        } else {
            throw new IllegalArgumentException("Unknown user type");
        }
    }
}
