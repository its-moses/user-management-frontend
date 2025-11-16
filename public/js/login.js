async function loadCaptcha() {
    try {
        const res = await api.get('/captcha');
        document.getElementById('captcha_id').value = res.data.captcha_id;
        document.getElementById('captcha_question').innerText = res.data.question;
    } catch (e) {
        showError("Failed to load captcha");
    }
}

document.addEventListener("DOMContentLoaded", loadCaptcha);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        clearErrors();
        hideMessages();
        setLoading(true);

        try {
            // STEP 1 — Get CSRF cookie (MANDATORY)
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                withCredentials: true
            });

            // STEP 2 — Submit login
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                captcha_id: document.getElementById('captcha_id').value,
                captcha_answer: document.getElementById('captcha_answer').value
            };

            const response = await api.post("/login", formData);

            if (response.data.success) {
                showSuccess("Login successful! Redirecting...");
                setTimeout(() => window.location.href = "/dashboard", 1000);
            } else {
                showError(response.data.message);
            }

        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    });
});
