package fr.hyperion.defmarket.ports.company.persistence;

import fr.hyperion.defmarket.data.company.Company;

public interface AddOtherActivityAdapter {
    Company updateOtherValue(Long id, String otherActivity);
}
