package fr.hyperion.defmarket.enumerated.company;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ThemeTypeEnum {
    NOEL("offer.theme.noel"),
    HALLOWEEN("offer.theme.holloween"),
    PAQUES("offer.theme.paques"),
    TOUSSAINT("offer.theme.toussaint"),
    NO_THEME("offer.theme.NO_THEME"),
	PROMO_FALSH("offer.theme.PROMO_FALSH"),
	BLACK_FRIDAY("offer.theme.BLACK_FRIDAY"),
	MOTHER_PARTY("offer.theme.MOTHER_PARTY"),
	FATHER_PARTY("offer.theme.FATHER_PARTY"),
	BACK_TO_SCHOOL("offer.theme.BACK_TO_SCHOOL"),
	NATIONAL_PARTY("offer.theme.NATIONAL_PARTY"),
	SAINT_PATRICK("offer.theme.SAINT_PATRICK"),
	LIQUIDATION("offer.theme.LIQUIDATION"),
	YEARS_DAY("offer.theme.YEARS_DAY"),
	SAINT_VALENTIN("offer.theme.SAINT_VALENTIN");

    private String themeType;

}
