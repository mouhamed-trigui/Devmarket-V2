package fr.hyperion.defmarket.ports.user.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;

public interface GetTraderByCompanyIdAdapter {
    DefmarketUser getTraderByCompanyId(Long companyId);

    List<Operator> getListTraderByCompanyId(Long companyId);
}
