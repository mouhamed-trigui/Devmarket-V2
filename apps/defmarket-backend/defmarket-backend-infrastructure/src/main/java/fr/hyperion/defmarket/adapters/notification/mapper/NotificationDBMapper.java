package fr.hyperion.defmarket.adapters.notification.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.adapters.user.mapper.UserDBMapper;
import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;
import fr.hyperion.defmarket.data.notification.UserNotification;
import fr.hyperion.defmarket.database.entity.AdminHistoryNotificationDB;
import fr.hyperion.defmarket.database.entity.UserNotificationDB;

@Mapper(uses = {UserDBMapper.class})
public interface NotificationDBMapper {


    @Mapping(target = "ownerId", source = "owner.id")
    UserNotification toData(UserNotificationDB userNotificationDB);


    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "id", source = "userNotification.id")
    @Mapping(target = "owner", ignore = true)
    UserNotificationDB toEntity(UserNotification userNotification);


    AdminHistoryNotification toData(AdminHistoryNotificationDB adminHistoryNotificationDB);

    List<AdminHistoryNotification> toData(List<AdminHistoryNotificationDB> adminHistoryNotificationDB);


    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "storeCategory", ignore = true)
    AdminHistoryNotificationDB toEntity(AdminHistoryNotification adminHistoryNotification);

}
