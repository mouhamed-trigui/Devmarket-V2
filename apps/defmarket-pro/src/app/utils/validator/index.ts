export const passwordValidator = (password: string) => {
    let validated = true;
    // should contain 8 characters
    if (password?.length < 8) validated = false;
    // should contain at least one digit
    else if (!/\d/.test(password)) validated = false;
    // should contain at least one lower case
    else if (!/[a-z]/.test(password)) validated = false;
    // should contain at least one upper case
    else if (!/[A-Z]/.test(password)) validated = false;
    // should contain at least one  special characters
    else if (!/\W|_/g.test(password)) validated = false;
    // should contain at least 8 from the mentioned characters
    // else if (/[^0-9a-zA-Z]/.test(password)) validated = false;
    return validated;
};

export const isValidEmail = (email: string) => {
    // Not empty
    if (email?.length === 0) return false;
    // Email type
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
};

export const getStatusColor = (password: string, key: string) => {
    let validated = true;
    switch (key) {
        case '8 characters': // should contain 8 characters
            if (password?.length < 8) validated = false;
            break;
        case 'one digit': // should contain at least one digit
            if (!/\d/.test(password)) validated = false;
            break;
        case 'one lower case': // should contain at least one lower case
            if (!/[a-z]/.test(password)) validated = false;
            break;
        case 'one upper case': // should contain at least one upper case
            if (!/[A-Z]/.test(password)) validated = false;
            break;
        case 'special characters': // should contain at least one  special characters
            if (!/\W|_/g.test(password)) validated = false;
            break;
        case 'contain at least 8': // should contain at least 8 from the mentioned characters
            if (/[^0-9a-zA-Z]/.test(password)) validated = false;
            break;
        default:
            break;
    }
    if (password?.length === 0) {
        return 'system.200';
    } else {
        if (validated) {
            return 'emerald.500';
        } else if (!validated) {
            return 'error.600';
        }
    }
};

export default {
    isValidEmail,
    passwordValidator,
    getStatusColor,
};
