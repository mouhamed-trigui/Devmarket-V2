package fr.hyperion.defmarket.service.company;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyFilter;
import fr.hyperion.defmarket.ports.company.persistence.CreateCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyByFilterAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompaniesCountAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompanyByNameOrSirenAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompanyBySirenAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetNextCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetOneCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.UpdateCompanyAdapter;
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
import fr.hyperion.defmarket.ports.store.useCase.BlockAllStoreActionUseCase;
import fr.hyperion.defmarket.ports.store.useCase.DeleteAllStoreUseCase;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import fr.hyperion.defmarket.service.exceptions.DuplicatedSirenException;
import fr.hyperion.defmarket.utilitary.event.BlockActionCompanyEvent;
import fr.hyperion.defmarket.utilitary.event.CreateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateCompanyByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class AdminCompanyServiceImpl implements CreateCompanyByAdminUseCase, ValidateCompanyUseCase,
    BlockCompanyActionUseCase, DeleteCompanyByAdminUseCase, UpdateCompanyByAdminUseCase, GetCompanyByNameOrSirenUseCase,
    GetAllCompanyWithFilterUseCase, GetCompaniesCountUseCase, GetNextCompanyUseCase, GetCompanyByUserIdUseCase {

    private final GetCompanyByNameOrSirenAdapter getCompanyByNameOrSirenAdapter;
    private final GetCompanyBySirenAdapter getCompanyBySirenAdapter;
    private final CreateCompanyAdapter createCompanyAdapter;
    private final UpdateCompanyAdapter updateCompanyAdapter;
    private final GetOneCompanyAdapter getOneCompanyAdapter;
    private final GetAllCompanyByFilterAdapter getAllCompanyByFilterAdapter;
    private final GetCompaniesCountAdapter getCompaniesCountAdapter;
    private final GetNextCompanyAdapter getNextCompanyAdapter;

    private final BlockAllStoreActionUseCase blockAllStore;
    private final DeleteAllStoreUseCase deleteAllOfferUseCase;
    private final DateAndTimeUseCase dateAndTimeUseCase;
    private final GetAllCompanyAdapter getAllCompanyAdapter;


    private final EventPublisher eventPublisher;

    @Override
    public Company createByAdmin(final Company company, final Long ownerId) {
        Assert.isNull(company.getId(), "You cannot create a company with this specific ID.");
        company.setValidatedByAdmin(true);

        if (!getCompanyBySirenAdapter.getBySiren(company.getSiren()).isEmpty()) {
            throw new DuplicatedSirenException("This Siren is already in use");
        }

        final Company companyCreated = createCompanyAdapter.create(company, ownerId);
        final CreateCompanyByAdminEvent createCompanyByAdminEvent = new CreateCompanyByAdminEvent(company, ownerId,
            this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(createCompanyByAdminEvent);
        log.info("Company has been created by admin {}", company.getId());

        return companyCreated;
    }

    @Override
    public void validateCompany(final Long id) {
        final Company company = getOneCompanyAdapter.getById(id);
        company.setValidatedByAdmin(true);
        updateCompanyAdapter.update(company);
        final ValidateCompanyByAdminEvent validateCompanyByAdminEvent = new ValidateCompanyByAdminEvent(id, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(validateCompanyByAdminEvent);
        log.info("Company has been validated by admin {}", company.getId());
    }

    @Override
    public void blockCompanyAction(final Long id, final Boolean blockAction, final String reason) {

        final Company company = getOneCompanyAdapter.getById(id);
        company.setBlocked(blockAction);
        updateCompanyAdapter.update(company);
        blockAllStore.blockAllStoreAction(id, blockAction);
        final BlockActionCompanyEvent blockActionCompanyEvent = new BlockActionCompanyEvent(id, reason, blockAction,
            this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(blockActionCompanyEvent);
        log.info("Companies with id {} has been {} by admin", id, blockAction ? "blocked" : "unblocked");
    }

    @Override
    public void deleteByAdmin(final Long companyId) {
        final Company company = getOneCompanyAdapter.getById(companyId);
        company.setDeleted(true);
        updateCompanyAdapter.update(company);
        deleteAllOfferUseCase.deleteAllStore(companyId);
        final DeleteCompanyByAdminEvent deleteCompanyByAdminEvent = new DeleteCompanyByAdminEvent(companyId, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(deleteCompanyByAdminEvent);
        log.info("Company id {} has been deleted by admin", companyId);
    }

    @Override
    public Company updateByAdmin(final Company company) {
        Assert.isTrue(company.getId() != null, "Please specify the ID of the company you want to update.");
        final UpdateCompanyByAdminEvent updateCompanyByAdminEvent = new UpdateCompanyByAdminEvent(company, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(updateCompanyByAdminEvent);
        final Company updateCompany = updateCompanyAdapter.update(company);
        log.info("Company id {} has been updated by admin ", company.getId());
        return updateCompany;
    }

    @Override
    public Page<Company> getAllCompanyWithFilter(final CompanyFilter companyFilter, final Pageable pageable) {
        return getAllCompanyByFilterAdapter.getAllByFilter(companyFilter, pageable);
    }

    @Override
    public Long getCompaniesCount(final CompanyFilter companyFilter) {
        return getCompaniesCountAdapter.getCompaniesCount(companyFilter);
    }

    @Override
    public Company getNextCompany(final Long currentCompanyId, final CompanyFilter companyFilter, final boolean desc) {
        return getNextCompanyAdapter.getNextCompany(currentCompanyId, companyFilter, desc);
    }

    @Override
    public Page<Company> getCompanyByNameOrSiren(final Pageable pageable, final String input) {
        return getCompanyByNameOrSirenAdapter.GetCompanyByNameOrSiren(pageable, input);
    }

    @Override
    public List<Company> getCompanyByUserId(final Long userId) {
        return getAllCompanyAdapter.getAllByOwnerId(userId);
    }
}
