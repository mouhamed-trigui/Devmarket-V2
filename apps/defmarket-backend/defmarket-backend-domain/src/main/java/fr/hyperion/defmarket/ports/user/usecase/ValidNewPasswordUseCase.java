package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface ValidNewPasswordUseCase {
    void validNewPassword(DefmarketUser operator, final String newPassword, String key);
}
