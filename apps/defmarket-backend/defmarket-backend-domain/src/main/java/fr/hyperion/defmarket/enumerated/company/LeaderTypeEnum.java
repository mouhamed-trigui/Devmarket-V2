package fr.hyperion.defmarket.enumerated.company;

import lombok.Getter;

@Getter
public enum LeaderTypeEnum {
	PRESIDENT("Dirigeant"),
	MANAGER("Responsable de la structure");

	private final String stringValue;

    LeaderTypeEnum(String value) {
        stringValue = value;
    }
}
