package fr.hyperion.defmarket.ports.company.event;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class NotificationData {

    private String to;
    private String sound;
    private String title;
    private String body;

    public NotificationData(final String to, final String sound, final String title, final String body) {
        this.to = to;
        this.sound = sound;
        this.title = title;
        this.body = body;
    }
}
