package fr.hyperion.defmarket.service.company;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;
import fr.hyperion.defmarket.ports.company.persistence.AddOtherActivityAdapter;
import fr.hyperion.defmarket.ports.company.persistence.CreateCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyWithStoresAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompanyBySirenAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetOneCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.UpdateCompanyAdapter;
import fr.hyperion.defmarket.ports.company.usecase.AddCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.AddOtherActivityUseCase;
import fr.hyperion.defmarket.ports.company.usecase.BlockAllCompanyActionUseCase;
import fr.hyperion.defmarket.ports.company.usecase.DeleteCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.UpdateCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.ValidateAllCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetAllCompanyWithStoresUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.RetrieveAllCompanyUseCase;
import fr.hyperion.defmarket.ports.company.usecase.getters.RetrieveCompanyUseCase;
import fr.hyperion.defmarket.ports.store.useCase.BlockAllStoreActionUseCase;
import fr.hyperion.defmarket.ports.store.useCase.DeleteAllStoreUseCase;
import fr.hyperion.defmarket.ports.store.useCase.ValidateAllStoreUseCase;
import fr.hyperion.defmarket.service.exceptions.DuplicatedSirenException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements AddCompanyUseCase, UpdateCompanyUseCase, DeleteCompanyUseCase,
    RetrieveCompanyUseCase, RetrieveAllCompanyUseCase, AddOtherActivityUseCase, BlockAllCompanyActionUseCase,
    ValidateAllCompanyUseCase, GetAllCompanyWithStoresUseCase {

    private final GetCompanyBySirenAdapter getCompanyBySirenAdapter;
    private final CreateCompanyAdapter createCompanyAdapter;
    private final UpdateCompanyAdapter updateCompanyAdapter;
    private final GetOneCompanyAdapter getOneCompanyAdapter;
    private final GetAllCompanyAdapter getAllCompanyAdapter;
    private final AddOtherActivityAdapter createOtherActivityAdapter;

    private final BlockAllStoreActionUseCase blockAllStore;
    private final DeleteAllStoreUseCase deleteAllOfferUseCase;
    private final ValidateAllStoreUseCase validateAllStore;
    private final GetAllCompanyWithStoresAdapter getAllCompanyWithStoresAdapter;


    @Override
    public void delete(final Long id) {
        final Company com = getById(id);
        com.setDeleted(true);
        update(com);
        final Long comId = com.getId();
        deleteAllOfferUseCase.deleteAllStore(comId);
        log.info("Company with id {} has been deleted", id);
    }

    @Override
    public void deleteAllCompanyOfUser(final Long userId) {
        final List<Company> companies = getAllCompanyAdapter.getAllByOwnerId(userId);
        for (final Company company : companies) {
            delete(company.getId());
        }
    }


    @Override
    public Company create(final Company company, final Long ownerId) {
        Assert.isNull(company.getId(), "You cannot create a company with this specific ID.");
        final Company companyDB;
        if (getCompanyBySirenAdapter.getBySiren(company.getSiren()).isEmpty()) {
            companyDB = createCompanyAdapter.create(company, ownerId);
            log.info("Company has been created {}", company.getId());
        } else {
            throw new DuplicatedSirenException("This Siren Name is allready in used");
        }
        return companyDB;
    }

    @Override
    public Company update(final Company company) {
        Assert.isTrue(company.getId() > 0L, "Please specify the ID of the company you want to update.");
        final Company update = updateCompanyAdapter.update(company);
        log.info("Company id {} has been updated ", company.getId());
        return update;
    }

    @Override
    public Company getById(final Long id) {
        return getOneCompanyAdapter.getById(id);
    }

    @Override
    public List<Company> getByOwnerId(final Long ownerId) {
        return getAllCompanyAdapter.getAllByOwnerId(ownerId);
    }


    @Override
    public Company update(final Long id, final String otherActivity) {
        final Company company = createOtherActivityAdapter.updateOtherValue(id, otherActivity);
        log.info("Company id {} create OtherActivity", id);
        return company;
    }

    @Override
    public void blockAllCompanyAction(final Long userId, final Boolean blockAction) {

        final List<Company> companies = getAllCompanyAdapter.getAllByOwnerId(userId);
        for (final Company company : companies) {
            company.setBlocked(blockAction);
            updateCompanyAdapter.update(company);
            final Long comId = company.getId();
            blockAllStore.blockAllStoreAction(comId, blockAction);
            log.info("Companies with id {} has been {}", comId, blockAction ? "blocked" : "unblocked");
        }
    }

    @Override
    public void validateAllCompany(final Long userId) {
        final List<Company> companies = getAllCompanyAdapter.getAllByOwnerId(userId);
        for (final Company company : companies
        ) {
            company.setValidatedByAdmin(true);
            updateCompanyAdapter.update(company);
            final Long companyId = company.getId();
            validateAllStore.validateAllStore(companyId);
            log.info("Companies id {} has been validated", companyId);
        }
    }

    @Override
    public Page<CompanyWithStoresNbrAndOwner> getCompaniesByOwnerId(Long ownerId, Pageable pageable) {
        return getAllCompanyWithStoresAdapter.getAllCompaniesWithStoresByOwnerId(ownerId,pageable);
    }
}
