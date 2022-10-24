package fr.hyperion.defmarket.controller.pro.notification.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;
import fr.hyperion.defmarket.data.notification.UserNotification;
import fr.hyperion.defmarket.dto.request.user.notification.AdminNotificationRequest;
import fr.hyperion.defmarket.dto.response.historytrace.AdminHistoryNotificationResponse;
import fr.hyperion.defmarket.dto.response.user.notification.UserNotificationResponse;


@Mapper
public interface NotificationMapper {


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "iconType", ignore = true)
    @Mapping(target = "totalTradersNumber", ignore = true)
    @Mapping(target = "storeCategory", ignore = true)
    AdminHistoryNotification toEntity(AdminNotificationRequest userNotificationRequest);


    UserNotificationResponse toResponse(UserNotification userNotification);

    @Mapping(target = "storeCategoryName", source = "storeCategory.name")
    AdminHistoryNotificationResponse toResponse(AdminHistoryNotification adminHistoryNotification);


}
