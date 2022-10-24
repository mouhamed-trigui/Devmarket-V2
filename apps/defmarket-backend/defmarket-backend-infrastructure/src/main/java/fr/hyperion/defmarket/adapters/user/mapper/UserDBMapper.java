package fr.hyperion.defmarket.adapters.user.mapper;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import fr.hyperion.defmarket.adapters.company.mapper.CompanyDBMapper;
import fr.hyperion.defmarket.adapters.job.mapper.JobDBMapper;
import fr.hyperion.defmarket.adapters.roles.mapper.RoleDBMapper;
import fr.hyperion.defmarket.common.mappers.AddressDBMapper;
import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.common.mappers.ExpoTokenDBMapper;
import fr.hyperion.defmarket.common.mappers.PhoneDBMapper;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.user.Admin;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.OperatorMinified;
import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {DocumentDBMapper.class, AddressDBMapper.class, PhoneDBMapper.class, ExpoTokenDBMapper.class, JobDBMapper.class, RoleDBMapper.class})
public abstract class UserDBMapper {

    @Autowired
    private CompanyDBMapper companyDBMapper;

    @Mapping(target = "notificationList", ignore = true)
    @Mapping(target = "historyTraces", ignore = true)
    @Mapping(target = "address", source = "user.address")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "job", source = "job")
    @Mapping(target = "avatar", source = "documents.avatar")
    @Mapping(target = "justificationVeteran", source = "documents.justificationVeteran")
    @Mapping(target = "justificationIdentity", source = "documents.justificationIdentity")
    @Mapping(target = "userType", constant = "TRADER")
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "userCompanyList", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    public abstract UserAccountDB toEntity(Operator user);

    @Mapping(target = "veteran", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "userCompanyList", ignore = true)
    @Mapping(target = "phone", ignore = true)
    @Mapping(target = "notificationList", ignore = true)
    @Mapping(target = "newEmail", ignore = true)
    @Mapping(target = "lastName", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "knowUsThroughOtherValue", ignore = true)
    @Mapping(target = "knowUsThrough", ignore = true)
    @Mapping(target = "justificationVeteran", ignore = true)
    @Mapping(target = "justificationIdentity", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "historyTraces", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "completeRegistration", ignore = true)
    @Mapping(target = "communication", ignore = true)
    @Mapping(target = "birthday", ignore = true)
    @Mapping(target = "birthCity", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "activity", ignore = true)
    @Mapping(target = "crispId", ignore = true)
    @Mapping(target = "userType", constant = "ADMIN")
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    public abstract UserAccountDB toEntity(Admin user);

    public UserAccountDB toEntity(final DefmarketUser user) {
        if (user instanceof Operator trader) {
            return toEntity(trader);
        } else if (user instanceof Admin admin) {
            return toEntity(admin);
        }
        return null;
    }

    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "justificationVeteran", ignore = true)
    @Mapping(target = "justificationIdentity", ignore = true)
    @Mapping(target = "notificationList", ignore = true)
    @Mapping(target = "historyTraces", ignore = true)
    @Mapping(ignore = true, target = "createdBy")
    @Mapping(ignore = true, target = "createdDate")
    @Mapping(ignore = true, target = "lastModifiedBy")
    @Mapping(ignore = true, target = "lastModifiedDate")
    @Mapping(ignore = true, target = "version")
    @Mapping(ignore = true, target = "userCompanyList")
    @Mapping(target = "address", source = "user.address")
    @Mapping(target = "phone", ignore = true)
    @Mapping(target = "job", ignore = true)
    @Mapping(target = "expoTokens", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    public abstract UserAccountDB toEntity(Operator user, @MappingTarget UserAccountDB userAccountDB);

    @Mapping(target = "documents", ignore = true)
    @Mapping(source = "address", target = "address")
    @Mapping(source = "phone", target = "phone")
    @Mapping(target = "documents.avatar", source = "avatar")
    @Mapping(target = "documents.justificationVeteran", source = "justificationVeteran")
    @Mapping(target = "documents.justificationIdentity", source = "justificationIdentity")
    @Mapping(target = "blocked", source = "blocked")
    @Mapping(target = "expired", source = "expired")
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "conciergerieUserAccount", ignore = true)
    @Mapping(target = "companies", source = "userCompanyList", qualifiedByName = "getCompanies")
    public abstract OperatorWithCompanies toOperator(UserAccountDB userAccountDB);

    @Mapping(target = "resetPassToken", ignore = true)
    @Mapping(target = "activationCode", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    public abstract Admin toAdmin(UserAccountDB userAccountDB);

    @Named("getCompanies")
    List<Company> getCompanies(final List<UserAccountCompanyDB> userAccountCompanyDBS) {
        final List<CompanyDB> companyDBList = userAccountCompanyDBS.stream().map(UserAccountCompanyDB::getCompany).filter(companyDB -> !companyDB.isDeleted()).toList();
        return companyDBMapper.toData(companyDBList);
    }

    public abstract OperatorMinified toOperatorMinified(UserAccountDB userAccountDB);

    public abstract List<OperatorMinified> toOperatorMinified(List<UserAccountDB> userAccountDB);


    public abstract List<Operator> toOperator(List<UserAccountDB> userAccountDB);


    public DefmarketUser toData(final UserAccountDB userAccountDB) {
        return toOperator(userAccountDB);
    }
}
