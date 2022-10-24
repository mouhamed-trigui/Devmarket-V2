import React, { useContext, useEffect } from 'react';
import { Button, Text } from '../../../../../../components/atomes';
import {
    Box,
    Checkbox,
    HStack,
    KeyboardAvoidingView,
    VStack,
} from 'native-base';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    FormControl,
    RadioGroup,
} from '../../../../../../components/molecules';
import {
    ITimetableProps,
    ITemporaryClosureProps,
} from '../../../../../../services/model/company';
import {
    getAllTimetableOfStore,
    updateTimetableList,
} from '../../../../../../services/methodes/store';
import { FormattedMessage } from 'react-intl';
import { companyActions } from '../../../../../../stores/slices/company/companySlice';
import { useNavigation } from '@react-navigation/native';
import DatePickerModal from '../../../../../../components/atomes/datePicker/DatePickerModal';

// assets
import addBtnPng from '../../../../../../../assets/images/png/bouton-ajouter.png';
import closeBtnPng from '../../../../../../../assets/images/png/close-white.png';
import moment from 'moment';
import { SpinnerContext } from '../../../../../../components/atomes/spinner/SpinnerProvider';

const days = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
];

const StoreTimetable = () => {
    const { selectedStore } = useSelector((state: any) => state.company);

    const [timetables, setTimetables] = React.useState<ITimetableProps[]>([]);

    const [
        temporaryClosure,
        setTemporaryClosure,
    ] = React.useState<ITemporaryClosureProps>(
        selectedStore.temporaryClosure ?? ({} as ITemporaryClosureProps)
    );

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const { setSpinnerVisibily } = useContext(SpinnerContext);

    useEffect(() => {
        getAllTimetableOfStore(selectedStore.id)
            .then((data) =>
                setTimetables(
                    days.map(
                        (day) =>
                            data.find((item) => item.day === day) ??
                            ({ day } as ITimetableProps)
                    )
                )
            )
            .catch((err) => console.log(err));

        return () => {
            setTimetables([]);
        };
    }, [selectedStore.id]);

    const handleStartTimeChange = (
        start: string,
        day: ITimetableProps,
        workingTimeIndex: number
    ) => {
        setTimetables((old) =>
            old.map((d) =>
                d.day === day.day
                    ? {
                          ...d,
                          workingTime:
                              d.workingTime && d.workingTime.length > 0
                                  ? d.workingTime.map((w, j) =>
                                        j === workingTimeIndex
                                            ? {
                                                  ...w,
                                                  start,
                                              }
                                            : w
                                    )
                                  : [
                                        {
                                            start,
                                            end: '',
                                        },
                                    ],
                      }
                    : d
            )
        );
    };

    const handleEndTimeChange = (
        end: string,
        day: ITimetableProps,
        workingTimeIndex: number
    ) => {
        setTimetables((old) =>
            old.map((d) =>
                d.day === day.day
                    ? {
                          ...d,
                          workingTime:
                              d.workingTime && d.workingTime.length > 0
                                  ? d.workingTime.map((w, j) =>
                                        j === workingTimeIndex
                                            ? {
                                                  ...w,
                                                  end,
                                              }
                                            : w
                                    )
                                  : [
                                        {
                                            end,
                                            start: '',
                                        },
                                    ],
                      }
                    : d
            )
        );
    };

    const handleAddWorkingTime = (i: number) => {
        setTimetables((old) =>
            old.map((d, index) =>
                index === i
                    ? {
                          ...d,
                          workingTime:
                              d.workingTime && d.workingTime.length > 0
                                  ? [
                                        ...d.workingTime,
                                        {
                                            start: '',
                                            end: '',
                                        },
                                    ]
                                  : [
                                        {
                                            start: '',
                                            end: '',
                                        },
                                        {
                                            start: '',
                                            end: '',
                                        },
                                    ],
                      }
                    : d
            )
        );
    };

    const handleRemoveTimetable = (
        dayIndex: number,
        workingTimeIndex: number
    ) => {
        setTimetables((old) =>
            old.map((d, index) =>
                index === dayIndex
                    ? {
                          ...d,
                          workingTime:
                              d.workingTime && d.workingTime?.length > 1
                                  ? d.workingTime.filter(
                                        (_, j) => j !== workingTimeIndex
                                    )
                                  : [],
                      }
                    : d
            )
        );
    };

    const handleDayActivityChange = (index: number) => {
        setTimetables((old) =>
            old.map((d, i) =>
                i === index
                    ? {
                          ...d,
                          active: !d.active,
                      }
                    : d
            )
        );
    };

    const handleSubmit = () => {
        setSpinnerVisibily(true);
        updateTimetableList(selectedStore.id, {
            timetables,
            temporaryClosure: {
                ...temporaryClosure,
                closureType:
                    temporaryClosure.closureType === ''
                        ? null
                        : temporaryClosure.closureType,
            },
        }).then((data) => {
            dispatch(
                companyActions.setSelectedStore({
                    ...selectedStore,
                    temporaryClosure: data.temporaryClosure,
                    timetables: days.map(
                        (day) =>
                            data.timetables.find((item) => item.day === day) ??
                            ({ day } as ITimetableProps)
                    ),
                })
            );
            setSpinnerVisibily(false);
            navigation.goBack();
        });
    };

    const TimePicker = (props: {
        placeholder: string;
        value: string | undefined;
        onChange: (time: string) => void;
    }) => (
        <DatePickerModal
            mode="time"
            placeholder={props.placeholder}
            value={props.value}
            onChange={(time: string) =>
                props.onChange(moment(time).format('HH:mm'))
            }
            inputStyle={{
                web: {
                    width: '55px',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px white solid',
                    borderRadius: '5px',
                    paddingInline: '5px',
                    height: 36,
                },
                container: {
                    width: 55,
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingVertical: 10,
                },
                text: {
                    textAlign: 'center',
                    marginLeft: 8,
                },
            }}
        />
    );
    return (
        <KeyboardAvoidingView
            h={{
                base: 'auto',
                lg: 'auto',
            }}
            behavior={'position'}
        >
            <Box
                width={Dimensions.get('window').width - 50}
                alignSelf="center"
                marginBottom={5}
            >
                <HStack
                    justifyContent="flex-end"
                    space={60}
                    marginRight={120}
                    marginBottom={2}
                >
                    <Text>De</Text>
                    <Text>À</Text>
                </HStack>
                <VStack space={3}>
                    {timetables.map((day, i) => (
                        <VStack space={2} key={day.day}>
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Checkbox
                                    value={''}
                                    isChecked={day.active}
                                    onChange={() => handleDayActivityChange(i)}
                                >
                                    <Text style={{ marginLeft: 10 }}>
                                        <FormattedMessage id={day.day} />
                                    </Text>
                                </Checkbox>
                                <HStack space={5} alignItems="center">
                                    <TimePicker
                                        key={`${day.day}WT0Start`}
                                        placeholder="De"
                                        value={
                                            day?.workingTime &&
                                            day?.workingTime.length > 0
                                                ? day?.workingTime[0]?.start
                                                : ''
                                        }
                                        onChange={(value: string) =>
                                            handleStartTimeChange(value, day, 0)
                                        }
                                    />
                                    <TimePicker
                                        key={`${day.day}WT0End`}
                                        value={
                                            day?.workingTime &&
                                            day?.workingTime.length > 0
                                                ? day?.workingTime[0]?.end
                                                : ''
                                        }
                                        onChange={(time) =>
                                            handleEndTimeChange(time, day, 0)
                                        }
                                        placeholder="À"
                                    />
                                    <TouchableOpacity
                                        onPress={() => handleAddWorkingTime(i)}
                                    >
                                        <Image
                                            accessibilityLabel="add-btn-png"
                                            source={addBtnPng}
                                            style={{ width: 25, height: 25 }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleRemoveTimetable(i, 0)
                                        }
                                    >
                                        <Image
                                            accessibilityLabel="close-btn-png"
                                            source={closeBtnPng}
                                            style={{ width: 15, height: 15 }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </HStack>
                            </HStack>
                            {day.workingTime &&
                                day.workingTime?.length > 1 &&
                                day.workingTime.map((workingTime, index) =>
                                    index > 0 ? (
                                        <HStack
                                            key={day.day + 'WT' + index}
                                            space={5}
                                            alignItems="center"
                                            alignSelf="flex-end"
                                        >
                                            <TimePicker
                                                key={`${day.day}WT${index}Start`}
                                                value={workingTime.start}
                                                onChange={(time) =>
                                                    handleStartTimeChange(
                                                        time,
                                                        day,
                                                        index
                                                    )
                                                }
                                                placeholder="De"
                                            />
                                            <TimePicker
                                                key={`${day.day}WT${index}End`}
                                                value={workingTime.end}
                                                onChange={(time) =>
                                                    handleEndTimeChange(
                                                        time,
                                                        day,
                                                        index
                                                    )
                                                }
                                                placeholder="À"
                                            />

                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleAddWorkingTime(i)
                                                }
                                            >
                                                <Image
                                                    accessibilityLabel="store-time-add"
                                                    source={addBtnPng}
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleRemoveTimetable(
                                                        i,
                                                        index
                                                    )
                                                }
                                            >
                                                <Image
                                                    accessibilityLabel="close-btn"
                                                    source={closeBtnPng}
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                    }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </HStack>
                                    ) : null
                                )}
                        </VStack>
                    ))}
                </VStack>
                <VStack space={5} marginTop={5}>
                    <Text fontFamily="mono">Fermeture temporaire</Text>
                    <RadioGroup
                        name="holiday"
                        style={{}}
                        flexDirection="column"
                        value={temporaryClosure.closureType ?? ''}
                        items={[
                            { label: 'Aucune', value: '' },
                            {
                                label: 'Travaux et aménagement',
                                value: 'CONSTRUCTION',
                            },
                            {
                                label: 'Fermeture annuelle',
                                value: 'ANNUAL_CLOSURE',
                            },
                            { label: 'Vacances', value: 'HOLIDAYS' },
                        ]}
                        onChange={(value: string) =>
                            setTemporaryClosure({
                                ...temporaryClosure,
                                closureType: value,
                            })
                        }
                    />
                    <FormControl
                        isRequired={
                            !['', null, undefined].includes(
                                temporaryClosure.closureType
                            )
                        }
                        value={temporaryClosure.reason ?? ''}
                        onChange={(reason: string) =>
                            setTemporaryClosure({
                                ...temporaryClosure,
                                reason,
                            })
                        }
                        type="textarea"
                        placeholder="Raison de période de la fermeture"
                        helperText={null}
                    />
                    <Button
                        label="Mettre à jour"
                        onPress={handleSubmit}
                        isDisabled={
                            !['', null, undefined].includes(
                                temporaryClosure.closureType
                            ) &&
                            ['', null, undefined].includes(
                                temporaryClosure.reason
                            )
                        }
                    />
                </VStack>
            </Box>
        </KeyboardAvoidingView>
    );
};

export default StoreTimetable;
