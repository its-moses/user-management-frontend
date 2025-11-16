@extends('layouts.auth')

@section('title', 'Login')
@section('subtitle', 'Sign in to your account')

@section('auth-content')
<form id="loginForm">
    <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="email" placeholder="you@example.com" required>
    </div>
    
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Enter your password" required>
    </div>
    
    <div class="mb-3">
        <button type="button" class="btn btn-outline-primary w-100" id="getCaptchaBtn">
            <i data-feather="shield" style="width: 16px; height: 16px;"></i>
            Get CAPTCHA
        </button>
    </div>
    
    <div id="captchaQuestion" class="mb-3"></div>
    
    <div id="captchaAnswerGroup" class="mb-3" style="display: none;">
        <label for="captchaAnswer" class="form-label">Your Answer</label>
        <input type="text" class="form-control" id="captchaAnswer" placeholder="Enter answer" required>
    </div>
    
    <button type="submit" class="btn btn-primary w-100 mb-3">
        <i data-feather="log-in" style="width: 16px; height: 16px;"></i>
        Sign In
    </button>
    
    <div class="text-center">
        <a href="{{ url('/registerPage') }}" class="text-decoration-none">Don't have an account? Register</a>
    </div>
</form>
@endsection

@push('scripts')
 @vite(['resources/js/pages/login.js'])
@endpush