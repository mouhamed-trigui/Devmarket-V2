export const getCompleteRegistrationPercentage = (completeRegistration: {}) => {
    if (!completeRegistration) {
        return 0;
    }
    const nbrOfElement = Object.keys(completeRegistration).length;
    if (nbrOfElement === 0) {
        return 0;
    }
    const nbrOfElementCompleted = Object.values(completeRegistration).filter(
        (value) => value === true
    ).length;
    return Math.round((nbrOfElementCompleted / nbrOfElement) * 100);
};
