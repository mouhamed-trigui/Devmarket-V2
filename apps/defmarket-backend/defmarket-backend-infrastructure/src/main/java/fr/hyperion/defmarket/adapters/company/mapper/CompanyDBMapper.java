package fr.hyperion.defmarket.adapters.company.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import fr.hyperion.defmarket.common.mappers.AddressDBMapper;
import fr.hyperion.defmarket.common.mappers.RulerDBMapper;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.OperatorMinified;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;

@Mapper(uses = { AddressDBMapper.class, RulerDBMapper.class })
public abstract class CompanyDBMapper {


	@Mapping(target = "nbOfStores", source = "storeList", qualifiedByName = "getStoresNbr")
	@Mapping(target = "owners", source = "userCompanyList", qualifiedByName = "getOwners")
	@Mapping(target = "storeList", ignore = true)
	@Named("getCompanyWithStoresNbrAndOwner")
	public abstract CompanyWithStoresNbrAndOwner toData(CompanyDB companyDB);

	@Mapping(target = "nbOfStores", source = "storeList", qualifiedByName = "getStoresNbr")
	@Mapping(target = "owners", source = "userCompanyList", qualifiedByName = "getOwners")
	@Mapping(target = "storeList", source = "storeList", qualifiedByName = "getStores")
	@Named("getCompanyWithStoreslistAndNbr")
	public abstract CompanyWithStoresNbrAndOwner toCompanyStoreData(CompanyDB companyDB);

	@Named("toCompanyData")
	public abstract Company toCompanyData(CompanyDB companyDB);

	@Named("getStoresNbr")
	int getStoresNbr(final List<StoreDB> storeList) {
		if (storeList == null) {
			return 0;
		}
		return (int) storeList.stream().filter(storeDB -> !storeDB.isDeleted()).count();
	}

	@Named("getStores")
	List<Store> getStores(final List<StoreDB> storeListDb) {
		final List<Store> storeList = new ArrayList<Store>();
		for (final StoreDB storeDb : storeListDb) {
            if (!storeDb.isDeleted()) {
                final Store store = new Store();
                store.setName(storeDb.getName());
                store.setId(storeDb.getId());
                storeList.add(store);
            }
        }
		return storeList;
	}

	public abstract OperatorMinified toOperatorMinified(UserAccountDB userAccountDB);

	public abstract List<OperatorMinified> toOperatorMinified(List<UserAccountDB> userAccountDB);

	@Named("getOwners")
	List<OperatorMinified> getOwners(final List<UserAccountCompanyDB> storeList) {
		final List<UserAccountDB> userAccountDBList = storeList.stream().map(UserAccountCompanyDB::getUserAccount)
				.toList();
		return toOperatorMinified(userAccountDBList);
	}

	public abstract List<Company> toData(List<CompanyDB> companyDB);

	@Mapping(target = "storeList", ignore = true)
	@Mapping(target = "version", ignore = true)
	@Mapping(target = "lastModifiedDate", ignore = true)
	@Mapping(target = "lastModifiedBy", ignore = true)
	@Mapping(target = "createdDate", ignore = true)
	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "id", source = "company.id")
	@Mapping(target = "address", source = "company.address")
	@Mapping(target = "ruler", source = "company.ruler")
	@Mapping(target = "deleted", source = "company.deleted")
	@Mapping(target = "validatedByAdmin", source = "company.validatedByAdmin")
	@Mapping(target = "userCompanyList", ignore = true)
	public abstract CompanyDB toEntity(Company company);

	@Mapping(target = "version", ignore = true)
	@Mapping(target = "lastModifiedDate", ignore = true)
	@Mapping(target = "lastModifiedBy", ignore = true)
	@Mapping(target = "createdDate", ignore = true)
	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "storeList", ignore = true)
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "userCompanyList", ignore = true)
	public abstract CompanyDB toEntity(Company company, @MappingTarget CompanyDB companyDB);
}
