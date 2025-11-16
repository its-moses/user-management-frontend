# User Management System - Frontend

A modern, responsive frontend for User Management System built with Laravel Blade, Bootstrap 5, and Vanilla JavaScript.

---

## 📋 Requirements

- PHP >= 8.1
- Composer >= 2.0
- Node.js >= 18.x
- NPM >= 9.x

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd user-management-frontend

# 2. Install dependencies
composer install
npm install

# 3. Setup environment
cp .env.example .env
php artisan key:generate

# 4. Configure .env file
# Edit .env and set your API URL:
# BACKEND_URL=http://127.0.0.1:8000
```

---

## 🏃 Running the Application

**You need TWO terminal windows running simultaneously:**

### Terminal 1: Vite Dev Server
```bash
npm run dev
```
Keep this running! It compiles your CSS/JS.

### Terminal 2: Laravel Server
```bash
php artisan serve --port=3000
```

### Access Application
Open browser: `http://127.0.0.1:3000`

---

## 🏗️ Building for Production

```bash
# Build optimized assets
npm run build

# Update .env
APP_ENV=production
APP_DEBUG=false

# Deploy to server
```

---

## 📁 Project Structure

```
resources/
├── js/
│   ├── pages/          # Page-specific JS (login.js, dashboard.js, etc.)
│   ├── api.js          # API client
│   ├── auth.js         # Authentication helper
│   └── app.js          # Main entry point
├── sass/
│   ├── _buttons.scss   # Custom button styles
│   ├── _tables.scss    # Custom table styles
│   └── app.scss        # Main SASS entry
└── views/
    ├── layouts/        # Blade layouts
    ├── auth/           # Login/Register pages
    └── pages/          # Dashboard, Profile, Admin pages
```

---

## 🐛 Common Issues

### Styles not applying?
```bash
# Remove CDN Bootstrap from resources/views/layouts/app.blade.php
# Ensure you have: @vite(['resources/sass/app.scss', 'resources/js/app.js'])
# Restart: npm run dev
# Hard refresh browser: Ctrl+Shift+R
```

### "Module not found" error?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Changes not showing?
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Make sure `npm run dev` is running

---

## 🎨 Customization

### Change Colors
Edit `resources/sass/app.scss`:
```scss
$primary: #6366f1;  // Your color here
```

### Modify Components
- Buttons: `resources/sass/_buttons.scss`
- Tables: `resources/sass/_tables.scss`
- Cards: `resources/sass/_cards.scss`

---

## ✅ Quick Command Reference

```bash
# Development (run both)
npm run dev              # Terminal 1
php artisan serve        # Terminal 2

# Production
npm run build

# Troubleshooting
php artisan cache:clear
npm install
```

---

## 📝 Important Notes

⚠️ **Always run BOTH `npm run dev` AND `php artisan serve` during development**

⚠️ **Never load Bootstrap from CDN** - Use Vite compilation only

⚠️ **Hard refresh browser** after making changes to see updates

---

**That's it! Happy coding! 🚀**