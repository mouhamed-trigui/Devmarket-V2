package fr.hyperion.defmarket.controller.admin.company;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.admin.company.mapper.CompanyAdminMapper;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyFilter;
import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;
import fr.hyperion.defmarket.dto.request.company.BlockActionCompanyRequest;
import fr.hyperion.defmarket.dto.request.company.CompanyCreationByAdminRequest;
import fr.hyperion.defmarket.dto.request.company.CompanyUpdateRequest;
import fr.hyperion.defmarket.dto.request.user.MoreInfoRequest;
import fr.hyperion.defmarket.dto.response.company.AdminCompanyResponse;
import fr.hyperion.defmarket.dto.response.company.CompanyResponse;
import fr.hyperion.defmarket.ports.company.usecase.BlockCompanyActionUseCase;
import fr.hyperion.defmarket.ports.company.usecase.CreateCompanyByAdminUseCase;
import fr.hyperion.defmarket.ports.company.usecase.DeleteCompanyByAdminUseCase;
import fr.hyperion.defmarket.ports.company.usecase.UpdateCompanyByAdminUseCase;
import fr.hyperion.defmarket.ports.company.usecase.ValidateCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetAllCompanyWithFilterUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetCompaniesCountUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetCompanyByNameOrSirenUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetCompanyByUserIdUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetNextCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.RetrieveCompanyUseCase;
import fr.hyperion.defmarket.ports.user.usecase.SendRequestInfoMailUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/company")
@PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY')")
public class AdminCompanyController extends AbstractController {

    private final CreateCompanyByAdminUseCase createCompanyByAdminUseCase;
    private final ValidateCompanyUseCase validateCompanyUseCase;
    private final BlockCompanyActionUseCase blockCompanyActionUseCase;
    private final DeleteCompanyByAdminUseCase deleteCompanyByAdminUseCase;
    private final UpdateCompanyByAdminUseCase updateCompanyByAdminUseCase;
    private final RetrieveCompanyUseCase retrieveCompanyUseCase;
    private final GetAllCompanyWithFilterUseCase getAllCompanyWithFilterUseCase;
    private final GetCompaniesCountUseCase getCompaniesCountUseCase;
    private final GetNextCompanyUseCase getNextCompanyUseCase;
    private final GetCompanyByNameOrSirenUseCase getCompanyByNameOrSirenUseCase;
    private final GetCompanyByUserIdUseCase getCompanyByUserIdUseCase;
    private final SendRequestInfoMailUseCase sendRequestInfoMailUseCase;


    private final CompanyAdminMapper companyMapper;

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_CREATE')")
    @Operation(summary = "Create Company")
    @PostMapping
    public ResponseEntity<CompanyResponse> createByAdmin(
        @RequestBody @Valid final CompanyCreationByAdminRequest companyCreationRequest, final BindingResult result) {
        checkBindingResult(result);
        Company company = companyMapper.toEntity(companyCreationRequest);
        company = createCompanyByAdminUseCase.createByAdmin(company, companyCreationRequest.ownerId);
        final CompanyResponse companyResponse = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_UPDATE')")
    @Operation(summary = "Validate Company By Id")
    @PatchMapping("/{companyId}/validate-company")
    public ResponseEntity<Void> validateCompanyById(@PathVariable final Long companyId) {
        validateCompanyUseCase.validateCompany(companyId);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_UPDATE')")
    @Operation(summary = "Block/UnBlock Company By Id")
    @PatchMapping("/{companyId}/block-action")
    public ResponseEntity<Void> blockActionCompanyById(@PathVariable final Long companyId, @RequestBody final BlockActionCompanyRequest blockActionCompanyRequest) {
        blockCompanyActionUseCase.blockCompanyAction(companyId, blockActionCompanyRequest.blockAction, blockActionCompanyRequest.reason);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_DELETE')")
    @Operation(summary = "Delete Company")
    @DeleteMapping("/{companyId}")
    public ResponseEntity<Void> deleteCompany(@PathVariable final Long companyId) {
        deleteCompanyByAdminUseCase.deleteByAdmin(companyId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_UPDATE')")
    @Operation(summary = "Update Company By Admin ")
    @PutMapping("/{companyId}")
    public ResponseEntity<CompanyResponse> updateByAdmin(@PathVariable final Long companyId, @RequestBody final CompanyUpdateRequest companyUpdateRequest,
                                                         final BindingResult result) {
        checkBindingResult(result);
        Company company = retrieveCompanyUseCase.getById(companyId);
        company = companyMapper.toEntity(companyUpdateRequest, company);
        company = updateCompanyByAdminUseCase.updateByAdmin(company);
        final CompanyResponse companyResponse = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_READ')")
    @Operation(summary = "Get Company By Name Or Siren")
    @GetMapping("/search")
    public ResponseEntity<Page<AdminCompanyResponse>> getCompanyByNameOrSiren(final Pageable pageable,
                                                                              @RequestParam(required = false) final String input) {
        final Page<Company> companies = getCompanyByNameOrSirenUseCase.getCompanyByNameOrSiren(pageable, input);
        final Page<AdminCompanyResponse> companyResponses = companies.map(company -> companyMapper.toResponse((CompanyWithStoresNbrAndOwner) company));
        return ResponseEntity.ok(companyResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_READ')")
    @Operation(summary = "GetAll My Company with Filter")
    @GetMapping
    public ResponseEntity<Page<AdminCompanyResponse>> getAllMyCompany(final CompanyFilter companyFilter,
                                                                      final Pageable pageable) {
        final Page<Company> companies = getAllCompanyWithFilterUseCase.getAllCompanyWithFilter(companyFilter, pageable);
        final Page<AdminCompanyResponse> companyResponses = companies.map(company -> companyMapper.toResponse((CompanyWithStoresNbrAndOwner) company));
        return ResponseEntity.ok(companyResponses);
    }

    @Operation(summary = " Get the count of Company  can be validated")
    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_READ')")
    @GetMapping("/count")
    public ResponseEntity<Long> getCounter(final CompanyFilter companyFilter) {
        final Long companiesCount = getCompaniesCountUseCase.getCompaniesCount(companyFilter);
        return ResponseEntity.ok(companiesCount);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_READ')")
    @Operation(summary = "GetNextCompany with id and filter")
    @GetMapping("/next")
    public ResponseEntity<CompanyResponse> getNextCompany(@RequestParam(required = false) final Long id,
                                                          final CompanyFilter companyFilter) {
        final Company company = getNextCompanyUseCase.getNextCompany(id, companyFilter, false);
        final CompanyResponse companyResponse = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_READ')")
    @Operation(summary = "GetPreviousCompany with id and filter")
    @GetMapping("/previous")
    public ResponseEntity<CompanyResponse> getPreviousCompany(@RequestParam(required = false) final Long id,
                                                              final CompanyFilter companyFilter) {
        final Company company = getNextCompanyUseCase.getNextCompany(id, companyFilter, true);
        final CompanyResponse companyResponse = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_READ')")
    @Operation(summary = "Get Companies By userId ")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CompanyResponse>> getCompaniesByUserId(@PathVariable final Long userId) {
        final List<Company> company = getCompanyByUserIdUseCase.getCompanyByUserId(userId);
        final List<CompanyResponse> companyResponses = companyMapper.toResponse(company);
        return ResponseEntity.ok(companyResponses);
    }

    @Operation(summary = "Request more information sending a mail to company ")
    @PostMapping("/{companyId}/request-more-info")
    public ResponseEntity<Void> sendRequestInfoMailForCompany(@PathVariable final Long companyId,
                                                              @RequestBody @Valid final MoreInfoRequest moreInfoRequest) {
        sendRequestInfoMailUseCase.sendRequestInfoMailCompany(companyId, moreInfoRequest.subject,
            moreInfoRequest.message);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_COMPANY_READ')")
    @Operation(summary = "Get company by id")
    @GetMapping("/{companyId}")
    public ResponseEntity<AdminCompanyResponse> getCompanyById(@PathVariable final Long companyId) {
        final Company company = retrieveCompanyUseCase.getById(companyId);
        final AdminCompanyResponse companyResponse = companyMapper.toResponse((CompanyWithStoresNbrAndOwner) company);
        return ResponseEntity.ok(companyResponse);
    }
}
