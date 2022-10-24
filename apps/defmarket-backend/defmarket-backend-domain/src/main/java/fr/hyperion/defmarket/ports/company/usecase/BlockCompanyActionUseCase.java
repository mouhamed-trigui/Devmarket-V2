package fr.hyperion.defmarket.ports.company.usecase;

public interface BlockCompanyActionUseCase {
    void blockCompanyAction(Long id, Boolean blockAction, final String reason);
}
