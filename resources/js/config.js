const API_CONFIG = {
    baseURL: 'http://127.0.0.1:8000' + '/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

export default API_CONFIG;