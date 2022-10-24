

   export  const getDepartmentNumber = (zipCode: string) => {
        const departmentNumber = zipCode?.substring(0, 2);
        if (departmentNumber === '97' || departmentNumber === '98') {
            return zipCode.substring(0, 3);
        } else {
            return departmentNumber;
        }
    };