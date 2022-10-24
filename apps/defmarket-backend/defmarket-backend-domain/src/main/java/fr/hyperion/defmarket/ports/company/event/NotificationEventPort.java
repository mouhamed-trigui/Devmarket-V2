package fr.hyperion.defmarket.ports.company.event;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface NotificationEventPort {
	
	void publishEvent(NotificationData notificationData, DefmarketUser defmarketUser);

}
