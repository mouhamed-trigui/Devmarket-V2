package fr.hyperion.defmarket.enumerated.company;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum IconTypeEnum {
    WELCOME("user.notification.icon.welcome"),
    OFFER("user.notification.icon.offer"),
    STORE("user.notification.icon.store"),
    COMPANY("user.notification.icon.company"),
    PROFILE("user.notification.icon.profile");

    private String iconType;

}
