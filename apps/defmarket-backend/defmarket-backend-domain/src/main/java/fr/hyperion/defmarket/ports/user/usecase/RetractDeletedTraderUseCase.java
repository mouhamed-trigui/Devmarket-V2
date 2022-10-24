package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.Operator;

public interface RetractDeletedTraderUseCase {
    void retractDeletedTrader(Operator user);
}
