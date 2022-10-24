package fr.hyperion.defmarket.service.versionUpdate;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.ports.versionUpdate.CheckVersionAdapter;
import fr.hyperion.defmarket.ports.versionUpdate.CheckVersionUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class VersionUpdateServiceImpl implements CheckVersionUseCase {
    private final CheckVersionAdapter checkVersionAdapter;

    @Override
    public boolean checkVersion(final String frontVersion) {
        if (!checkVersionAdapter.checkVersion(frontVersion)) {
            return false;
        }
        log.info("your current version:" + frontVersion + " is up-to-date");
        return true;
    }

}
