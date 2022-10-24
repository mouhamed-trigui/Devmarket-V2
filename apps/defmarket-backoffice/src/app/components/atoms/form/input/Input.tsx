import React, { ChangeEventHandler, ReactNode, useState } from 'react';
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface IInputProps {
    label?: string;
    value?: any;
    onChange?: (value: string) => void;
    onClick?: () => void;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    fullWidth?: boolean;
    style?: any;
    disabled?: boolean;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
    multiline?: boolean;
    rows?: string | number;
    placeholder?: string;
    name?: string;
    readOnly?: boolean;
    error?: boolean;
    helperText?: ReactNode;
    min?: number;
    max?: number;
}

interface ICustomOutlinedInputProps {
    label?: ReactNode;
    value?: any;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClick?: any;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    fullWidth?: boolean;
    style?: any;
    disabled?: boolean;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
    multiline?: boolean;
    rows?: string | number;
    placeholder?: string;
    name?: string;
    readOnly?: boolean;
    error?: boolean;
    helperText?: ReactNode;
    min?: number;
    max?: number;
}

const CustomOutlinedInput: React.FC<ICustomOutlinedInputProps> = ({
    label,
    value,
    onChange,
    onClick,
    type,
    required,
    fullWidth,
    style,
    disabled,
    endAdornment,
    startAdornment,
    multiline,
    rows,
    placeholder,
    name,
    readOnly,
    error,
    helperText,
    min,
    max,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <FormControl
            error={error}
            variant="outlined"
            size="small"
            fullWidth={fullWidth}
        >
            <InputLabel htmlFor={`outlined-basic-${label}`}>{label}</InputLabel>
            <OutlinedInput
                inputProps={{ min, max }}
                readOnly={readOnly}
                placeholder={placeholder}
                rows={rows}
                multiline={multiline}
                disabled={disabled}
                fullWidth={fullWidth}
                id={`outlined-basic-${label}`}
                style={style}
                label={label}
                value={value}
                name={name}
                onChange={onChange}
                onClick={onClick}
                type={
                    type === 'password'
                        ? showPassword
                            ? 'text'
                            : 'password'
                        : type === 'date'
                        ? undefined
                        : type
                }
                required={required}
                startAdornment={startAdornment}
                endAdornment={
                    type === 'password' ? (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="primary"
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ) : (
                        endAdornment
                    )
                }
                {...props}
            />
            {helperText && (
                <FormHelperText id={`outlined-basic-${label}`}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

const Input: React.FC<IInputProps> = (props) => {
    return ['date', 'time', 'datetime-local'].includes(
        props.type ? props.type?.toString() : 'text'
    ) ? (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
            {props.type === 'date' ? (
                <DatePicker
                    label={props.label}
                    value={props.value ?? null}
                    onChange={(date) =>
                        props.onChange ? props.onChange(date) : undefined
                    }
                    renderInput={(params) => (
                        <CustomOutlinedInput
                            required={props.required}
                            fullWidth={props.fullWidth}
                            disabled={props.disabled}
                            endAdornment={params?.InputProps?.endAdornment}
                            startAdornment={params?.InputProps?.startAdornment}
                            {...params}
                        />
                    )}
                />
            ) : props.type === 'time' ? (
                <TimePicker
                    label={props.label}
                    value={props.value ?? null}
                    onChange={(date) =>
                        props.onChange ? props.onChange(date) : undefined
                    }
                    renderInput={(params) => (
                        <CustomOutlinedInput
                            required={props.required}
                            fullWidth={props.fullWidth}
                            disabled={props.disabled}
                            endAdornment={params?.InputProps?.endAdornment}
                            startAdornment={params?.InputProps?.startAdornment}
                            {...params}
                        />
                    )}
                />
            ) : (
                <DateTimePicker
                    label={props.label}
                    value={props.value ?? null}
                    onChange={(date) =>
                        props.onChange ? props.onChange(date) : undefined
                    }
                    renderInput={(params) => (
                        <CustomOutlinedInput
                            required={props.required}
                            fullWidth={props.fullWidth}
                            disabled={props.disabled}
                            endAdornment={params?.InputProps?.endAdornment}
                            startAdornment={params?.InputProps?.startAdornment}
                            {...params}
                        />
                    )}
                />
            )}
        </LocalizationProvider>
    ) : (
        <CustomOutlinedInput
            {...props}
            onChange={(e) =>
                props.onChange ? props.onChange(e.target.value) : undefined
            }
        />
    );
};

export default Input;
