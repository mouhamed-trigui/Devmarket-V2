package fr.hyperion.defmarket.adapters.versionUpdate;

import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.ports.versionUpdate.CheckVersionAdapter;
import fr.hyperion.defmarket.properties.DefmarketProperty;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class VersionUpdateAdapter implements CheckVersionAdapter {
    private final DefmarketProperty defmarketProperty;

    @Override
    public boolean checkVersion(final String frontVersion) {
        return defmarketProperty.getFrontVersion().compareTo(frontVersion) <= 0;
    }

}
