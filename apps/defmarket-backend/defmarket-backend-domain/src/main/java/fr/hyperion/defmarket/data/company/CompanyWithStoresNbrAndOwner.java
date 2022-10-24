package fr.hyperion.defmarket.data.company;

import java.util.List;

import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.OperatorMinified;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class CompanyWithStoresNbrAndOwner extends Company {
    private int nbOfStores;
    private List<OperatorMinified> owners;
    private List<Store>  storeList;
}
