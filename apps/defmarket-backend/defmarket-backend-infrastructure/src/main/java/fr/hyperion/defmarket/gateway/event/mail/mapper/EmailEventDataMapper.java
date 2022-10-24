package fr.hyperion.defmarket.gateway.event.mail.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import fr.hyperion.defmarket.gateway.event.mail.EmailEventData;
import fr.hyperion.defmarket.ports.user.mail.EmailData;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface EmailEventDataMapper {
	
	EmailEventData toEmailEventData(EmailData emailData);

}
