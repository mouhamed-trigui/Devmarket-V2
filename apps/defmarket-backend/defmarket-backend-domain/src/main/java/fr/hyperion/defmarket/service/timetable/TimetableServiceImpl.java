package fr.hyperion.defmarket.service.timetable;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.CreateTimetableAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.GetAllTimetableAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.GetTimetableByIdAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.UpdateTimetableAdapter;
import fr.hyperion.defmarket.ports.timetable.useCase.TimetableCRUDUseCase;
import fr.hyperion.defmarket.ports.timetable.useCase.TimetableFactoryUseCase;
import fr.hyperion.defmarket.ports.timetable.useCase.TimetableUpdateUseCase;
import fr.hyperion.defmarket.ports.timetable.useCase.getters.GetAllTimetableOfStoreUseCase;
import fr.hyperion.defmarket.ports.timetable.useCase.getters.GetTimetableByIdUseCase;
import fr.hyperion.defmarket.ports.user.persistence.GetTraderByCompanyIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserAdapter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TimetableServiceImpl implements TimetableFactoryUseCase, TimetableUpdateUseCase, TimetableCRUDUseCase, GetAllTimetableOfStoreUseCase, GetTimetableByIdUseCase {

    private final CreateTimetableAdapter createTimetableAdapter;
    private final UpdateTimetableAdapter updateTimetableAdapter;
    private final GetAllTimetableAdapter getAllTimetableAdapter;
    private final GetTimetableByIdAdapter getTimetableByIdAdapter;
    private final GetStoreByIdAdapter getStoreByIdAdapter;
    private final GetTraderByCompanyIdAdapter getTraderByCompanyIdAdapter;
    private final UpdateUserAdapter updateUserAdapter;

    @Override
    public Timetable create(final Long storeId, final Timetable timetable) {
        return createTimetableAdapter.create(storeId, timetable);
    }

    @Override
    public Timetable update(final Long timetableId, final Timetable timetable) {
        updateTimetableAdapter.update(timetableId, timetable);
        return getById(timetableId);
    }


    @Override
    public List<Timetable> getAllTimetableOfStore(final Long storeId) {
        return getAllTimetableAdapter.getAllTimetableOfStore(storeId);
    }

    @Override
    public Timetable getById(final Long id) {
        return getTimetableByIdAdapter.getById(id);
    }

    @Override
    public List<Timetable> crud(final Long storeId, final List<Timetable> timetables) {
        if (timetables != null) {
            timetables.forEach(timetable -> {
                if (timetable.getId() == null) {
                    create(storeId, timetable);
                } else {
                    update(timetable.getId(), timetable);
                }
            });
        }

        final List<Timetable> allTimetableOfStore = getAllTimetableOfStore(storeId);

        final Store store = getStoreByIdAdapter.getStoreById(storeId);

        if (!StringUtils.isBlank(store.getName()) && !StringUtils.isBlank(store.getDescription()) && store.getCategory() != null && hasActiveTimetable(allTimetableOfStore)) {
            if ((store.getStoreType().equals(StoreTypeEnum.E_COMMERCE) && !store.isECommerceAndPhysicalStore() && store.getWebsite() != null) || (store.getStoreType().equals(StoreTypeEnum.PHYSICAL) && !store.isECommerceAndPhysicalStore() && store.getAddress() != null) || (store.isECommerceAndPhysicalStore() && store.getAddress() != null && store.getWebsite() != null)) {
                final Operator user =
                    (Operator) getTraderByCompanyIdAdapter.getTraderByCompanyId(store.getCompany().getId());
                user.getCompleteRegistration().setStoreCompleted(true);
                updateUserAdapter.update(user);
            }
        }
        return allTimetableOfStore;
    }

    private boolean hasActiveTimetable(final List<Timetable> allTimetableOfStore) {
        return allTimetableOfStore.stream().anyMatch(Timetable::isActive);
    }
}
