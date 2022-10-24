import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup as RadioGroupMUI,
} from '@mui/material';

interface IRadioGroupProps<T> {
    directionRow?: boolean;
    defaultValue?: T;
    label?: string;
    value?: T;
    radioList?: { value: T; label: string }[];
    onChange?: (value: T) => void;
    required?: boolean;
    id?: string;
    disabled?: boolean;
}

function RadioGroup<T>(props: IRadioGroupProps<T>) {
    const str2bool = (value: any) => {
        if (value && typeof props.value === 'boolean') {
            if (value.toLowerCase() === 'true') return true;
            if (value.toLowerCase() === 'false') return false;
        }
        return value;
    };
    return (
        <FormControl
            style={{ marginBottom: '-2px' }}
            disabled={props?.disabled}
        >
            {props.label && (
                <FormLabel id="radio-buttons-group-label">
                    {props.label}
                </FormLabel>
            )}
            <RadioGroupMUI
                id={props.id}
                row={props.directionRow}
                aria-labelledby="radio-buttons-group-label"
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={(_e, value: unknown) =>
                    props.onChange
                        ? props?.onChange(str2bool(value as T))
                        : undefined
                }
            >
                {props.radioList &&
                    props?.radioList.map((radio) => (
                        <FormControlLabel
                            key={radio.label}
                            value={radio.value}
                            control={
                                <Radio
                                    required={props.required}
                                    color="warning"
                                    id={radio.label}
                                    checked={radio.value === props.value}
                                />
                            }
                            label={radio.label}
                        />
                    ))}
            </RadioGroupMUI>
        </FormControl>
    );
}

export default RadioGroup;
