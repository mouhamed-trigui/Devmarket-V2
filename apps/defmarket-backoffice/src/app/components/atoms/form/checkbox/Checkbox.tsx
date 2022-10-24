import { Checkbox as CheckboxMUI, FormControlLabel } from '@mui/material';
import { FC, CSSProperties } from 'react';

const Checkbox: FC<{
    value?: any;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    label: string;
    style?: CSSProperties;
}> = ({ value, label, style, checked, onChange }) => {
    return (
        <FormControlLabel
            style={style}
            control={
                <CheckboxMUI
                    value={value}
                    checked={checked}
                    onChange={(_e, checked) =>
                        onChange ? onChange(checked) : undefined
                    }
                />
            }
            label={label}
        />
    );
};

export default Checkbox;
