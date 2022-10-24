package fr.hyperion.defmarket.adapters.company;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.company.mapper.CompanyDBMapper;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyFilter;
import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.repository.CompanyRepository;
import fr.hyperion.defmarket.database.repository.UserRepository;
import fr.hyperion.defmarket.database.specification.CompanySpecification;
import fr.hyperion.defmarket.ports.company.persistence.AddOtherActivityAdapter;
import fr.hyperion.defmarket.ports.company.persistence.CreateCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyByFilterAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyWithStoresAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompaniesCountAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompanyByNameOrSirenAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompanyBySirenAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetNextCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetOneCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.UpdateCompanyAdapter;
import fr.hyperion.defmarket.service.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CompanyAdapter
    implements GetOneCompanyAdapter, GetAllCompanyAdapter, CreateCompanyAdapter, UpdateCompanyAdapter,
    AddOtherActivityAdapter, GetAllCompanyByFilterAdapter, GetCompaniesCountAdapter, GetNextCompanyAdapter,
    GetCompanyByNameOrSirenAdapter, GetCompanyBySirenAdapter, GetAllCompanyWithStoresAdapter {

    private final CompanyRepository companyRepository;
    private final CompanyDBMapper companyMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Company create(final Company company, final Long ownerId) {
        final UserAccountDB userAccountDB = userRepository.getReferenceById(ownerId);
        CompanyDB companyDB = companyMapper.toEntity(company);
        if (company.getRuler() != null) {
            companyDB.getRuler().setCompany(companyDB);
        }
        userAccountDB.getCompleteRegistration().setCompanyCompleted(true);
        companyDB.addUserToCompany(userAccountDB);
        companyDB = companyRepository.save(companyDB);
        return companyMapper.toData(companyDB);
    }

    @Override
    @Transactional
    public Company update(final Company company) {
        CompanyDB companyDB = companyRepository.findById(company.getId()).orElseThrow();
        companyDB = companyMapper.toEntity(company, companyDB);
        return companyMapper.toData(companyDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Company getById(final Long id) {
        final Specification<CompanyDB> byID = Specification.where(CompanySpecification.notDeleted())
            .and(CompanySpecification.getByID(id));
        final CompanyDB getOneCompany = companyRepository.findOne(byID).orElseThrow();
        return companyMapper.toData(getOneCompany);
    }

    @Override
    @Transactional(readOnly = true)
    public Company getByIdEvenIsDeleted(final Long id) {
        final CompanyDB getOneCompany = companyRepository.findById(id).orElseThrow();
        return companyMapper.toData(getOneCompany);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Company> getAllByOwnerId(final Long ownerId) {
        final Specification<CompanyDB> getAllCompanyByOwnerIdAndNotDelete = CompanySpecification
            .getCompanyByUserID(ownerId).and(CompanySpecification.notDeleted());
        final List<CompanyDB> companiesList = companyRepository.findAll(getAllCompanyByOwnerIdAndNotDelete);
        return companyMapper.toData(companiesList);
    }

    @Override
    @Transactional
    public Company updateOtherValue(final Long id, final String otherActivity) {
        final CompanyDB companyDB = companyRepository.findById(id).orElseThrow();
        companyDB.setOtherActivity(otherActivity);
        return companyMapper.toData(companyDB);
    }

    @Override
    @Transactional
    public List<Company> getBySiren(final String siren) {
        final Specification<CompanyDB> specification = Specification.where(CompanySpecification.notDeleted())
            .and(CompanySpecification.getBySiren(siren));
        final List<CompanyDB> companiesList = companyRepository.findAll(specification);
        return companyMapper.toData(companiesList);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Company> getAllByFilter(final CompanyFilter companyFilter, final Pageable pageable) {
        final Specification<CompanyDB> specification = Specification.where(CompanySpecification.notDeleted())
            .and(CompanySpecification.validatedByAdmin(companyFilter.getValidated()))
            .and(CompanySpecification.isBlocked(companyFilter.getBlocked()))
            .and(CompanySpecification.canBeValidated(companyFilter.getCanBeValidated()));
        final Page<CompanyDB> companyDBPage = companyRepository.findAll(specification, pageable);
        return companyDBPage.map(companyMapper::toData);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getCompaniesCount(final CompanyFilter companyFilter) {
        final Specification<CompanyDB> specification = Specification.where(CompanySpecification.notDeleted())
            .and(CompanySpecification.isBlocked(companyFilter.getBlocked()))
            .and(CompanySpecification.validatedByAdmin(companyFilter.getValidated()))
            .and(CompanySpecification.canBeValidated(companyFilter.getCanBeValidated()));
        return companyRepository.count(specification);
    }

    @Override
    @Transactional(readOnly = true)
    public Company getNextCompany(final Long currentCompanyId, final CompanyFilter companyFilter, final boolean desc) {
        final Specification<CompanyDB> specification = Specification
            .where(CompanySpecification.isBlocked(companyFilter.getBlocked()))
            .and(CompanySpecification.validatedByAdmin(companyFilter.getValidated()))
            .and(CompanySpecification.canBeValidated(companyFilter.getCanBeValidated()))
            .and(CompanySpecification.notDeleted())
            .and(CompanySpecification.getNextCompany(currentCompanyId, desc));
        final List<CompanyDB> companyDBList = companyRepository.findAll(specification);

        CompanyDB companyDB = null;
        if (companyDBList.size() > 0) {
            if (desc) {
                companyDB = companyDBList.get(companyDBList.size() - 1);
            } else {
                companyDB = companyDBList.get(0);
            }
        }
        if (companyDB == null) {
            throw new NotFoundException("Company");
        }
        return companyMapper.toData(companyDB);
    }

    @Override
    @Transactional
    public Page<Company> GetCompanyByNameOrSiren(final Pageable pageable, final String input) {
        final Page<CompanyDB> result;
        if (input != null) {
            result = companyRepository.findByCompanyNameAndSiren(pageable, input);
        } else {
            final Specification<CompanyDB> specification = Specification.where(CompanySpecification.notDeleted());
            result = companyRepository.findAll(specification, pageable);

        }
        return result.map(companyMapper::toData);
    }

    @Override
    @Transactional
    public Page<CompanyWithStoresNbrAndOwner> getAllCompaniesWithStoresByOwnerId(final Long ownerId, final Pageable pageable) {
        final Specification<CompanyDB> specification = Specification
            .where(CompanySpecification.notDeleted())
            .and(CompanySpecification.getCompanyByUserID(ownerId));
        final Page<CompanyDB> companyDBPage = companyRepository.findAll(specification, pageable);
        return companyDBPage.map(companyMapper::toCompanyStoreData);
    }
}
