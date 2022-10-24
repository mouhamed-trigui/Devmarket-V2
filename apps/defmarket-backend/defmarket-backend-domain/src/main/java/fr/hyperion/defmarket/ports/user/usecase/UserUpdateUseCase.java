package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.Operator;

public interface UserUpdateUseCase {

    Operator updateIdentityAndJob(Operator user, Long id);

    Operator updateProfile(Long jobId, Operator user);

    void changePassword(String email, String oldPassword, String newPassword);

    void resetPassword(final String email, final String newPassword);

}
