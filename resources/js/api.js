import API_CONFIG from './config.js';

class API {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.timeout = API_CONFIG.timeout;
        this.defaultHeaders = API_CONFIG.headers;
    }


    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        const token = localStorage.getItem('auth_token');

        const config = {
            method: options.method || 'GET',
            headers: {
                ...this.defaultHeaders,

                ...(token ? { Authorization: `Bearer ${token}` } : {}),

                ...options.headers
            },


            signal: this.createAbortSignal()
        };

        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (response.status === 401) {
                this.handleUnauthorized();
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return { success: true, data };
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }

    createAbortSignal() {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), this.timeout);
        return controller.signal;
    }

    handleUnauthorized() {
        localStorage.removeItem('auth_token');
        window.location.href = '/loginPage';
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: 'POST', body });
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: 'PUT', body });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

export default new API();
