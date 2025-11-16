import API from '../api.js';
import SweetAlert from '../sweetalert.js';

class RegisterPage {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.getCaptchaBtn = document.getElementById('getCaptchaBtn');
        this.captchaQuestion = document.getElementById('captchaQuestion');
        this.captchaAnswerGroup = document.getElementById('captchaAnswerGroup');
        this.captchaKey = null;

        this.init();
    }

    init() {
        this.getCaptchaBtn.addEventListener('click', () => this.fetchCaptcha());
        this.form.addEventListener('submit', (e) => this.handleRegister(e));
    }

    async fetchCaptcha() {
        try {
            SweetAlert.loading('Fetching CAPTCHA...');
            const response = await API.get('/captcha');
            
            this.captchaKey = response.data.captcha_id;
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

    async handleRegister(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password_confirmation = document.getElementById('password_confirmation').value;
        const captchaAnswer = document.getElementById('captchaAnswer').value;

        if (!this.captchaKey) {
            SweetAlert.error('Please get a CAPTCHA first');
            return;
        }

        try {
            SweetAlert.loading('Creating account...');
            
            await API.post('/register', {
                name,
                email,
                password,
                password_confirmation,
                role: 'user',
                captcha_id: this.captchaKey,
                captcha_answer: captchaAnswer
            });

            SweetAlert.close();
            SweetAlert.success('Account created successfully! Please login.', 'Success');
            
            setTimeout(() => {
                window.location.href = '/loginPage';
            }, 2000);
        } catch (error) {
            SweetAlert.error(error.message || 'Registration failed');
            this.fetchCaptcha();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RegisterPage();
});