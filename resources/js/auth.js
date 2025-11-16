import API from './api.js';

class Auth {

    async checkAuth() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) return null;

            const response = await API.get('/user');
            // console.log(response.data)   
            return response.data.data;
        } catch (error) {
            return null;
        }
    }

    async logout() {
        try {
            await API.post('/logout');

            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_role');

            window.location.href = '/loginPage';
        } catch (error) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_role');
            window.location.href = '/loginPage';
        }
    }

    isAuthenticated() {
        return this.checkAuth();
    }
}

export default new Auth();
