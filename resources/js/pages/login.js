import API from '../api.js';
import SweetAlert from '../sweetalert.js';

class LoginPage {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.getCaptchaBtn = document.getElementById('getCaptchaBtn');
        this.captchaQuestion = document.getElementById('captchaQuestion');
        this.captchaAnswerGroup = document.getElementById('captchaAnswerGroup');
        this.captchaKey = null;

        this.init();
    }

    init() {
        this.getCaptchaBtn.addEventListener('click', () => this.fetchCaptcha());
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
    }

    async fetchCaptcha() {
        try {
            SweetAlert.loading('Fetching CAPTCHA...');
            const response = await API.get('/captcha');

            this.captchaKey = response.data.captcha_id;
            // alert(this.captchaKey)
            this.captchaQuestion.innerHTML = `
                <div class="alert alert-info">
                    <strong>Question:</strong> ${response.data.question}
                </div>
            `;
            this.captchaAnswerGroup.style.display = 'block';

            SweetAlert.close();
            SweetAlert.toast('CAPTCHA loaded successfully', 'success');
        } catch (error) {
            SweetAlert.error(error.message || 'Failed to fetch CAPTCHA');
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const captchaAnswer = document.getElementById('captchaAnswer').value;

        if (!this.captchaKey) {
            SweetAlert.error('Please get a CAPTCHA first');
            return;
        }

        try {
            SweetAlert.loading('Logging in...');

            const response = await API.post('/login', {
                email,
                password,
                captcha_id: this.captchaKey,
                captcha_answer: captchaAnswer
            });
            // alert(response)
            console.log(response.data)

            SweetAlert.close();

            const userRole = response.data.data.user.role.name || 'user';
            const userName = response.data.data.user?.name || 'User';
            // const userName = response.data.data.user?.name || 'User';
            
            if (response.data.data.token) {
                const token = response.data.data.token;
                localStorage.setItem('user_name', userName);
                localStorage.setItem('user_role', userRole);
                localStorage.setItem('auth_token', token);
            }

            SweetAlert.toast(`Welcome back, ${userName}!`, 'success');

            setTimeout(() => {
                // window.location.href = '/dashboardPage';
                if (userRole === 'admin') {
                    // alert("went")
                    window.location.href = '/admin/usersPage';  // ← Admin goes to user management
                } else {
                    window.location.href = '/dashboardPage';     // ← Regular user goes to dashboard
                }
            }, 1000);

        } catch (error) {
            SweetAlert.error(error.message || 'Login failed');
            this.fetchCaptcha();
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});