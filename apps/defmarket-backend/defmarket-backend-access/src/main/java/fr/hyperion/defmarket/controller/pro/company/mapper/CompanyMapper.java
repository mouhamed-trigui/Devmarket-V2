package fr.hyperion.defmarket.controller.pro.company.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.common.mapper.AddressMapper;
import fr.hyperion.defmarket.common.mapper.RulerMapper;
import fr.hyperion.defmarket.controller.pro.store.mapper.StoreMapper;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;
import fr.hyperion.defmarket.dto.request.company.CompanyCreationRequest;
import fr.hyperion.defmarket.dto.request.company.CompanyUpdateRequest;
import fr.hyperion.defmarket.dto.response.company.CompanyResponse;
import fr.hyperion.defmarket.dto.response.company.CompanyWithStoresResponse;

@Mapper(uses = {AddressMapper.class, RulerMapper.class, StoreMapper.class})
public interface CompanyMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "otherActivity", ignore = true)
    Company toEntity(CompanyCreationRequest companyCreationRequest);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "otherActivity", ignore = true)
    Company toEntity(CompanyUpdateRequest companyUpdateRequest, @MappingTarget Company company);

    @Mapping(target = "companyId", source = "id")
    @Mapping(target = "companyName", source = "name")
    CompanyWithStoresResponse toResponseCompanyWithStore(CompanyWithStoresNbrAndOwner company);

    CompanyResponse toResponse(Company company);

    List<CompanyResponse> toResponse(List<Company> company);
}
