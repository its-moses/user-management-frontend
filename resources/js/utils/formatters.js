export const formatDate = (dateString, includeTime = true) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    
    return date.toLocaleDateString('en-US', options);
};

export const formatRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
};

export const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};