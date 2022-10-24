package fr.hyperion.defmarket.service.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.GlobalSearch;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.enumerated.EntityTypeEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.company.usecase.getters.GetCompanyByNameOrSirenUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOfferByNameUseCase;
import fr.hyperion.defmarket.ports.search.GlobalSearchUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByNameOrCityUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.SearchUserUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class GlobalSearchServiceImpl implements GlobalSearchUseCase {
    private final SearchUserUseCase searchUserUseCase;
    private final GetCompanyByNameOrSirenUseCase getCompanyByNameOrSirenUseCase;
    private final GetStoreByNameOrCityUseCase getStoreByNameOrCityUseCase;
    private final GetOfferByNameUseCase getOfferByNameUseCase;

    @Override
    public List<GlobalSearch> search(final String input) {
        final List<GlobalSearch> searchResponse = new ArrayList<>();
        final List<UserAccount> userAccounts = searchUserUseCase.searchByDetails(Pageable.ofSize(5), input, UserTypeEnum.TRADER).getContent();
        if (!userAccounts.isEmpty()) {
            searchResponse.addAll(userAccounts.stream().map(userAccount -> GlobalSearch
                .builder()
                .id(userAccount.getId())
                .text(userAccount.getEmail())
                .entityType(EntityTypeEnum.USER)
                .build()).toList());
        }

        final List<Company> companies = getCompanyByNameOrSirenUseCase.getCompanyByNameOrSiren(Pageable.ofSize(5), input).getContent();
        if (!companies.isEmpty()) {
            searchResponse.addAll(companies.stream().map(company -> GlobalSearch
                .builder()
                .id(company.getId())
                .text(company.getName())
                .entityType(EntityTypeEnum.COMPANY)
                .build()).toList());
        }

        final List<Store> stores = getStoreByNameOrCityUseCase.getStoreByNameOrCity(Pageable.ofSize(5), input).getContent();
        if (!stores.isEmpty()) {
            searchResponse.addAll(stores.stream().map(store -> GlobalSearch
                .builder()
                .id(store.getId())
                .text(store.getName())
                .entityType(EntityTypeEnum.STORE)
                .build()).toList());
        }

        final List<Offer> offers = getOfferByNameUseCase.getOfferByName(Pageable.ofSize(5), input).getContent();
        if (!offers.isEmpty()) {
            searchResponse.addAll(offers.stream().map(offer -> GlobalSearch
                .builder()
                .id(offer.getId())
                .text(offer.getTitle())
                .entityType(EntityTypeEnum.OFFER)
                .build()).toList());
        }

        searchResponse.sort((o1, o2) -> o1.getText().compareToIgnoreCase(o2.getText()));
        return searchResponse;
    }
}
