import { View } from 'react-native';
import { fonts } from '../../../theme/fonts';
import { fontSizes } from './../../../theme/fonts';
import { ThemeContext, ThemeType } from './../../../context/ThemeContext';
import { RadioBlanc } from '../../../theme/svgs';
import Text from '../../atomes/text/Text';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { ITimeTable } from './../../../services/model/store/index';

export interface IStoreStatus {
    isOpen: boolean;
    duration: number;
    workingTime: {
        start: string;
        end: string;
    };
}

interface StoreStatusProps {
    timeTable: ITimeTable[];
}

function StoreStatus(props: StoreStatusProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [storeStatus, setStoreStatus] = useState<IStoreStatus>();

    useEffect(() => {
        setStoreStatus(getStoreStatus(props?.timeTable));
    }, [props?.timeTable]);

    const getStoreStatus: (
        timetableList: ITimeTable[]
    ) => IStoreStatus | null = (timetableList) => {
        const weekDayName = moment().format('dddd');
        const currentTime = moment();
        const selectedTimeDay = timetableList?.find(
            (timetable) =>
                timetable.day.toLowerCase() === weekDayName.toLowerCase()
        );
        if (selectedTimeDay) {
            let selectedWorkingTime = selectedTimeDay.workingTime
                .map((workingTime) => {
                    const startTime = moment(workingTime.start, 'HH:mm:ss');
                    const endTime = moment(workingTime.end, 'HH:mm:ss');
                    return { startTime, endTime };
                })
                .find((workingTime) => {
                    if (
                        workingTime.startTime.isSameOrBefore(
                            workingTime.endTime
                        )
                    ) {
                        return currentTime.isBetween(
                            workingTime.startTime,
                            workingTime.endTime,
                            null,
                            '[)'
                        );
                    } else {
                        return !currentTime.isBetween(
                            workingTime.endTime,
                            workingTime.startTime,
                            null,
                            '[)'
                        );
                    }
                });
            let duration = 0;
            const isOpen = selectedWorkingTime !== undefined;
            if (isOpen) {
                duration = moment
                    .duration(
                        selectedWorkingTime.endTime.isSameOrAfter(currentTime)
                            ? selectedWorkingTime.endTime.diff(
                                  moment(currentTime, 'HH:mm:ss')
                              )
                            : currentTime.diff(
                                  moment(
                                      selectedWorkingTime.endTime,
                                      'HH:mm:ss'
                                  )
                              )
                    )
                    .asMinutes();
            } else {
                selectedWorkingTime = {
                    startTime: moment(
                        selectedTimeDay.workingTime[0].start,
                        'HH:mm:ss'
                    ),
                    endTime: moment(
                        selectedTimeDay.workingTime[0].end,
                        'HH:mm:ss'
                    ),
                };
                if (selectedTimeDay.workingTime.length > 1) {
                    for (
                        let index = 1;
                        index < selectedTimeDay.workingTime.length;
                        index++
                    ) {
                        if (
                            currentTime.isBetween(
                                moment(
                                    selectedTimeDay.workingTime[index - 1].end,
                                    'HH:mm:ss'
                                ),
                                moment(
                                    selectedTimeDay.workingTime[index].start,
                                    'HH:mm:ss'
                                ),
                                null,
                                '()'
                            )
                        ) {
                            selectedWorkingTime = {
                                startTime: moment(
                                    selectedTimeDay.workingTime[index].start,
                                    'HH:mm:ss'
                                ),
                                endTime: moment(
                                    selectedTimeDay.workingTime[index].end,
                                    'HH:mm:ss'
                                ),
                            };
                        }
                    }
                }
                duration = moment
                    .duration(
                        selectedWorkingTime.startTime.isSameOrAfter(currentTime)
                            ? selectedWorkingTime.startTime.diff(currentTime)
                            : currentTime.diff(selectedWorkingTime.startTime)
                    )
                    .asMinutes();
            }

            return {
                isOpen,
                duration: parseInt(duration.toFixed()),
                workingTime: {
                    start: selectedWorkingTime.startTime.format('HH:mm'),
                    end: selectedWorkingTime.endTime.format('HH:mm'),
                },
            };
        } else {
            return null;
        }
    };

    const getStoreColorStatus = (
        storeStatus: IStoreStatus,
        theme: ThemeType
    ) => {
        if (storeStatus) {
            switch (true) {
                case storeStatus?.isOpen && storeStatus?.duration > 30:
                    return theme.colors.success[50];
                case !storeStatus?.isOpen && storeStatus?.duration <= 30:
                    return theme.colors.secondary[50];
                case storeStatus?.isOpen && storeStatus?.duration <= 30:
                    return theme.colors.secondary[300];
                default:
                    return theme.colors.success[100];
            }
        } else {
            return theme.colors.info[200];
        }
    };

    const getStoreWorkingTime = (storeStatus: IStoreStatus) => {
        if (storeStatus) {
            switch (true) {
                case storeStatus?.isOpen && storeStatus?.duration > 30:
                    return `Ouvert ${storeStatus?.workingTime?.start} - ${storeStatus?.workingTime?.end}`;
                case !storeStatus?.isOpen && storeStatus?.duration <= 30:
                    return `Ouvre dans ${storeStatus?.duration} minutes /  ${storeStatus?.workingTime?.start}h - ${storeStatus?.workingTime?.end}h`;
                case storeStatus?.duration <= 30:
                    return `Ferme dans ${storeStatus?.duration} minutes /  ${storeStatus?.workingTime?.start}h - ${storeStatus?.workingTime?.end}h`;
                default:
                    return `Fermé`;
            }
        } else {
            return '';
        }
    };

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 3,
            }}
        >
            <RadioBlanc
                fill={getStoreColorStatus(storeStatus, theme)}
                height={12}
                width={12}
                style={{
                    marginRight: 10,
                }}
            />
            <Text
                fontFamily={fonts.body}
                fontSize={fontSizes['dm-sm']}
                color={theme.colors.info[50]}
            >
                {getStoreWorkingTime(storeStatus)}
            </Text>
        </View>
    );
}

export default StoreStatus;
