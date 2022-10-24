package fr.hyperion.defmarket.controller.admin.search;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.data.GlobalSearch;
import fr.hyperion.defmarket.ports.search.GlobalSearchUseCase;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/search")
@RequiredArgsConstructor
public class SearchController {
    private final GlobalSearchUseCase globalSearchUseCase;

    @GetMapping
    public ResponseEntity<List<GlobalSearch>> globalSearch(final String input) {
        final List<GlobalSearch> searchResponse = globalSearchUseCase.search(input);
        return ResponseEntity.ok(searchResponse);
    }
}
