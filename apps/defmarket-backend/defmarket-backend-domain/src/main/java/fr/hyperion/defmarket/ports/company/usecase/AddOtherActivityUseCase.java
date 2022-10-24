package fr.hyperion.defmarket.ports.company.usecase;

import fr.hyperion.defmarket.data.company.Company;

public interface AddOtherActivityUseCase {
    Company update(Long id, String otherActivity);
}

