package fr.hyperion.defmarket.controller.pro.company;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.pro.company.mapper.CompanyMapper;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;
import fr.hyperion.defmarket.dto.request.company.CompanyCreationRequest;
import fr.hyperion.defmarket.dto.request.company.CompanyUpdateRequest;
import fr.hyperion.defmarket.dto.response.company.CompanyResponse;
import fr.hyperion.defmarket.dto.response.company.CompanyWithStoresResponse;
import fr.hyperion.defmarket.ports.company.usecase.AddCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.AddOtherActivityUseCase;
import fr.hyperion.defmarket.ports.company.usecase.DeleteCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.UpdateCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetAllCompanyWithStoresUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.RetrieveAllCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.RetrieveCompanyUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/company")
@PreAuthorize("hasAuthority('PERM_COMPANY')")
public class CompanyController extends AbstractController {

    private final AddCompanyUseCase addCompanyUseCase;
    private final UpdateCompanyUseCase companyUpdateUseCase;
    private final DeleteCompanyUseCase companyDeleteUseCase;
    private final RetrieveCompanyUseCase retrieveCompanyUseCase;
    private final RetrieveAllCompanyUseCase retrieveAllCompanyUseCase;
    private final GetAllCompanyWithStoresUseCase getAllCompanyWithStoresUseCase;
    private final AddOtherActivityUseCase addOtherActivityUseCase;
    private final CompanyMapper companyMapper;

    @PreAuthorize("hasAuthority('PERM_COMPANY_READ')")
    @Operation(summary = "GetAll My Company")
    @GetMapping
    public ResponseEntity<List<CompanyResponse>> getAllMyCompany(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final List<Company> company = retrieveAllCompanyUseCase.getByOwnerId(Long.parseLong(jwt.getClaim("id")));
        final List<CompanyResponse> companyResponses = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponses);
    }

    @PreAuthorize("hasAuthority('PERM_COMPANY_READ')")
    @Operation(summary = "Get All My Companies with stores")
    @GetMapping("getAllCompaniesWithStores")
    public ResponseEntity<Page<CompanyWithStoresResponse>> getAllCompaniesWithStores(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt, final Pageable pageable) {
        final Page<CompanyWithStoresNbrAndOwner> companies = getAllCompanyWithStoresUseCase.getCompaniesByOwnerId(Long.parseLong(jwt.getClaim("id")), pageable);
        final Page<CompanyWithStoresResponse> companyResponses = companies.map(companyMapper::toResponseCompanyWithStore);
        return ResponseEntity.ok(companyResponses);
    }

    @PreAuthorize("hasAuthority('PERM_COMPANY_READ')")
    @Operation(summary = "Get Company By Company Id")
    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> getByID(@PathVariable final Long id,
                                                   @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Company company = retrieveCompanyUseCase.getById(id);
        final CompanyResponse companyResponse = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponse);
    }

    @PreAuthorize("hasAuthority('PERM_COMPANY_CREATE')")
    @Operation(summary = "Create Company")
    @PostMapping
    public ResponseEntity<CompanyResponse> create(
        @RequestBody @Valid final CompanyCreationRequest companyCreationRequest, final BindingResult result,
        @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        checkBindingResult(result);
        Company company = companyMapper.toEntity(companyCreationRequest);
        company = addCompanyUseCase.create(company, Long.parseLong(jwt.getClaim("id")));
        final CompanyResponse companyResponse = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponse);
    }

    @PreAuthorize("hasAuthority('PERM_COMPANY_UPDATE')")
    @Operation(summary = "Update Company ")
    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponse> update(@RequestBody @Valid final CompanyUpdateRequest companyUpdateRequest,
                                                  @PathVariable final Long id, final BindingResult result,
                                                  @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        checkBindingResult(result);
        Company company = retrieveCompanyUseCase.getById(id);
        company = companyMapper.toEntity(companyUpdateRequest, company);
        company = companyUpdateUseCase.update(company);
        final CompanyResponse companyResponse = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponse);
    }

    @PreAuthorize("hasAuthority('PERM_COMPANY_DELETE')")
    @Operation(summary = "Delete Company")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final Long id) {
        companyDeleteUseCase.delete(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('PERM_COMPANY_UPDATE')")
    @Operation(summary = "Add Other Activity")
    @PutMapping("/{id}/other-activity")
    public ResponseEntity<Void> otherActivity(@PathVariable final Long id, @RequestBody final String otherActivity) {
        addOtherActivityUseCase.update(id, otherActivity);
        return ResponseEntity.ok().build();
    }
}
