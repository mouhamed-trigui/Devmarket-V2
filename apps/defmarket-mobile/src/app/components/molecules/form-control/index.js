import React from 'react';
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
} from 'native-base';

export const FormControlMol = (props) => {
  const {
    label,
    value,
    type,
    placeholder,
    helperText = null,
    errorMessage = null,
    onChange,
  } = props;
  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}
    >
      <FormControl isRequired isInvalid={errorMessage !== null}>
        <Stack mx="4">
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
          {props?.helperText && (
            <FormControl.HelperText>{helperText}</FormControl.HelperText>
          )}
          {props?.errorMessage && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errorMessage}
            </FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>
    </Box>
  );
};

export default FormControlMol;
