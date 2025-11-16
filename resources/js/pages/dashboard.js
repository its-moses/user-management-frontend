import API from '../api.js';
import SweetAlert from '../sweetalert.js';
import Auth from '../auth.js';

class DashboardPage {
    constructor() {
        this.userNameEl = document.getElementById('userName');
        this.userEmailEl = document.getElementById('userEmail');
        this.userRoleEl = document.getElementById('userRole');
        this.lastLoginEl = document.getElementById('lastLogin');
        this.adminSection = document.getElementById('adminSection');
        this.totalUsersEl = document.getElementById('totalUsers');

        this.init();
    }

    async init() {
        await this.loadUserData();
    }

    async loadUserData() {
        try {
            const user = await Auth.checkAuth();
            
            if (!user) {
                // alert("went")
                window.location.href = '/loginPage';
                return;
            }
            // console.log(user)

            this.userNameEl.textContent = user.name;
            this.userEmailEl.textContent = user.email;
            this.userRoleEl.textContent = user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1);
            this.lastLoginEl.textContent = this.formatDate(user.last_login_at);

            if (user.role.name === 'admin') {
                this.adminSection.style.display = 'block';
                await this.loadAdminMetrics();
            }
        } catch (error) {
            SweetAlert.error('Failed to load user data');
        }
    }

    async loadAdminMetrics() {
        try {
            const response = await API.get('/admin/users?paginate=0&count=true');
            this.totalUsersEl.textContent = response.data.data.pagination.total || 0;
        } catch (error) {
            console.error('Failed to load metrics:', error);
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DashboardPage();
});