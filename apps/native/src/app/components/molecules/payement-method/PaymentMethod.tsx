import { Box, Checkbox } from 'native-base';
import React, { useState } from 'react';
import { primary } from '../../../theme/colors';
import FormControl from '../form-control/form-control';

const PaymentMethod = (props: {
    methodName: 'CASH' | 'CHECK' | 'CB';
    translate: string;
    defaultValue: boolean;
    defaultCondition: string;
    onCheckChange: (value: boolean) => void;
    onConditionChange: (value: string) => void;
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(props.defaultValue);
    const [condition, setCondition] = useState<string>(props.defaultCondition);
    return (
        <Box>
            <Checkbox
                key="PaymentCheckBox"
                marginLeft={12}
                alignItems="flex-start"
                value={props.methodName}
                isChecked={isChecked}
                onChange={(isSelected) => {
                    setIsChecked(isSelected);
                    props.onCheckChange(isSelected);
                }}
            >
                {props.translate}
            </Checkbox>
            {isChecked && (
                <FormControl
                    key={props.methodName + 'Condition'}
                    borderColor={primary[50]}
                    placeholderTextColor={primary[50]}
                    type="input"
                    placeholder="Condition"
                    helperText={null}
                    value={condition}
                    onChange={(condition: string) => {
                        setCondition(condition);
                        props.onConditionChange(condition);
                    }}
                />
            )}
        </Box>
    );
};

export default PaymentMethod;
