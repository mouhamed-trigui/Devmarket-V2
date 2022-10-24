import {
    FormControl,
    InputLabel,
    MenuItem,
    Select as SelectMUI,
} from '@mui/material';
import { ReactNode } from 'react';
interface ISelectProps<T> {
    label?: string;
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
    required?: boolean;
    options?: { value: T; label: ReactNode }[];
    fullWidth?: boolean;
    disabled?: boolean;
    variant?: 'outlined' | 'standard' | 'filled';
    renderValue?: (value: T) => ReactNode;
    size?: 'small' | 'medium';
    disableUnderline?: boolean;
}
const Select = <T extends string | number | undefined>({
    label,
    value,
    defaultValue,
    onChange,
    required,
    disabled,
    options,
    fullWidth,
    variant,
    renderValue,
    disableUnderline,
    size,
}: ISelectProps<T>) => {
    return (
        <FormControl
            fullWidth={fullWidth}
            size={size ?? 'small'}
            required={required}
            variant={variant ?? 'outlined'}
        >
            {label && (
                <InputLabel id={`outlined-select-label-${label}`}>
                    {label}
                </InputLabel>
            )}
            <SelectMUI
                disableUnderline={disableUnderline}
                disabled={disabled}
                labelId={`outlined-select-label-${label}`}
                id={`outlined-select-${label}`}
                defaultValue={defaultValue}
                value={value}
                label={label}
                MenuProps={{ onClick: (e) => e.stopPropagation() }}
                onChange={(e) =>
                    onChange ? onChange(e.target.value as T) : undefined
                }
                renderValue={renderValue}
            >
                {options &&
                    options.map((option, index) => (
                        <MenuItem key={`option-${index}`} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
            </SelectMUI>
        </FormControl>
    );
};

export default Select;
