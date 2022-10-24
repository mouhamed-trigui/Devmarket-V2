import React, { FC } from 'react';
import { Box, Checkbox, HStack, Stack, View } from 'native-base';
import { Text } from '../../atomes';

interface ICheckBoxProps {
    options: { value: string; label: string }[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    chekedValues: string[];
    columns?: number;
    fontColor?: string;
    checkBoxStyle?: any;
}

const CheckBoxGroup: FC<ICheckBoxProps> = ({
    options,
    chekedValues,
    onChange,
    columns,
    fontColor,
    checkBoxStyle,
}) => {
    return (
        <Stack flexWrap="wrap" flexDirection={'row'}>
            {options.map((option, index) => (
                <Box
                    key={'box-' + index}
                    width={columns && columns > 0 ? `1/${columns}` : 'full'}
                    paddingX={checkBoxStyle ? 0 : 3}
                >
                    <Checkbox
                        isChecked={chekedValues?.includes(option.value)}
                        key={option.value}
                        value={option.value}
                        my="1"
                        style={checkBoxStyle ? checkBoxStyle : {}}
                        onChange={(isSelected) =>
                            isSelected
                                ? onChange((chekedValues) =>
                                      chekedValues
                                          ? [...chekedValues, option.value]
                                          : [option.value]
                                  )
                                : onChange((chekedValues) =>
                                      chekedValues.filter(
                                          (value) => value !== option.value
                                      )
                                  )
                        }
                    >
                        <Text
                            key={'text-' + index}
                            style={{ margin: 5 }}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="center"
                            color={fontColor ?? 'system.50'}
                        >
                            {option.label}
                        </Text>
                    </Checkbox>
                </Box>
            ))}
        </Stack>
    );
};

export default CheckBoxGroup;
