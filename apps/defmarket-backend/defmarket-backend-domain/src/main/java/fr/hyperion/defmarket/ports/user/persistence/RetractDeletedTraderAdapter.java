package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.Operator;

public interface RetractDeletedTraderAdapter {
    void retractDeletedAdapter(Operator user);
}
