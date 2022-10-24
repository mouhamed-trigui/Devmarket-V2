package fr.hyperion.defmarket.controller.versionUpgrade;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.ports.versionUpdate.CheckVersionUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX + "/version")
@RequiredArgsConstructor
public class VersionUpgradeController extends AbstractController {
    private final CheckVersionUseCase checkVersionUseCase;


    @Operation(summary = "check if the front-Version is up-to-date")
    @PostMapping()
    public ResponseEntity<Boolean> update(@RequestParam final String frontVersion) {
        final boolean res = checkVersionUseCase.checkVersion(frontVersion);
        return ResponseEntity.ok(res);
    }


}
