package fr.hyperion.defmarket.ports.company.usecase;

public interface DeleteCompanyUseCase {
    void delete(Long id);

    void deleteAllCompanyOfUser(Long userId);
}
