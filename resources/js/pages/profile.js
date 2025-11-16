import API from '../api.js';
import SweetAlert from '../sweetalert.js';
import Auth from '../auth.js';

class ProfilePage {
    constructor() {
        this.form = document.getElementById('profileForm');
        this.editBtn = document.getElementById('editBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.roleInput = document.getElementById('role');
        this.lastLoginInput = document.getElementById('lastLogin');
        this.loginIpInput = document.getElementById('loginIp');

        this.originalData = {};
        this.isEditing = false;

        this.init();
    }

    async init() {
        await this.loadProfile();
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.editBtn.addEventListener('click', () => this.toggleEdit());
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());
        this.form.addEventListener('submit', (e) => this.handleSave(e));
    }

    async loadProfile() {
        try {
            const response = await API.get('/user/profile');
            const user = response.data.data;
            console.log(user)

            this.originalData = {
                name: user.name,
                email: user.email
            };

            this.nameInput.value = user.name;
            this.emailInput.value = user.email;
            // this.roleInput.value = user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1);
            // this.lastLoginInput.value = this.formatDate(user.last_login_at);
            // this.loginIpInput.value = user.login_ip || 'N/A';
        } catch (error) {
            SweetAlert.error('Failed to load profile');
        }
    }

    toggleEdit() {
        this.isEditing = true;
        this.nameInput.disabled = false;
        this.emailInput.disabled = false;
        
        this.editBtn.style.display = 'none';
        this.saveBtn.style.display = 'inline-block';
        this.cancelBtn.style.display = 'inline-block';
    }

    cancelEdit() {
        this.isEditing = false;
        this.nameInput.value = this.originalData.name;
        this.emailInput.value = this.originalData.email;
        this.nameInput.disabled = true;
        this.emailInput.disabled = true;
        
        this.editBtn.style.display = 'inline-block';
        this.saveBtn.style.display = 'none';
        this.cancelBtn.style.display = 'none';
    }

    async handleSave(e) {
        e.preventDefault();

        const name = this.nameInput.value;
        const email = this.emailInput.value;

        try {
            SweetAlert.loading('Saving profile...');
            
            await API.put('/user/profile', { name, email });

            this.originalData = { name, email };
            this.isEditing = false;
            this.nameInput.disabled = true;
            this.emailInput.disabled = true;
            
            this.editBtn.style.display = 'inline-block';
            this.saveBtn.style.display = 'none';
            this.cancelBtn.style.display = 'none';

            SweetAlert.close();
            SweetAlert.toast('Profile updated successfully', 'success');
        } catch (error) {
            SweetAlert.error(error.message || 'Failed to update profile');
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfilePage();
});