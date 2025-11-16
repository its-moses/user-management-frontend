export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 8;
};

export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

export const validateForm = (fields) => {
    const errors = {};
    
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        
        if (field.required && !validateRequired(field.value)) {
            errors[key] = `${field.label} is required`;
        }
        
        if (field.type === 'email' && field.value && !validateEmail(field.value)) {
            errors[key] = `${field.label} is invalid`;
        }
        
        if (field.type === 'password' && field.value && !validatePassword(field.value)) {
            errors[key] = `${field.label} must be at least 8 characters`;
        }
    });
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};