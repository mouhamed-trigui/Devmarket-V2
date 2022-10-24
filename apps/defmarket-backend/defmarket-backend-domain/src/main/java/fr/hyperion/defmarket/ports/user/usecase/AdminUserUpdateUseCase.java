package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.Operator;

public interface AdminUserUpdateUseCase {
    Operator updateIdentity(Operator user, Long jobId, String password);
}
