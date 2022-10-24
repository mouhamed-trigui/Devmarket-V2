package fr.hyperion.defmarket.ports.search;

import java.util.List;

import fr.hyperion.defmarket.data.GlobalSearch;

public interface GlobalSearchUseCase {
    List<GlobalSearch> search(String input);
}
