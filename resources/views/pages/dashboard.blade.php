@extends('layouts.dashboard')

@section('title', 'Dashboard')
@section('nav-dashboard', 'active')

@section('dashboard-content')
<div class="row">
    <div class="col-12 mb-4">
        <h2 class="text-gradient fw-bold">Welcome, <span id="userName">User</span>!</h2>
        <p class="text-muted">Here's an overview of your account</p>
    </div>
</div>

<div class="row g-4">
    <!-- Profile Summary Card -->
    <div class="col-md-6">
        <div class="card hover-lift">
            <div class="card-header">
                <i data-feather="user" style="width: 20px; height: 20px;"></i>
                Profile Summary
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="text-muted small">Email</label>
                    <p class="mb-0 fw-medium" id="userEmail">-</p>
                </div>
                <div class="mb-3">
                    <label class="text-muted small">Role</label>
                    <p class="mb-0" id="userRole">-</p>
                </div>
                <div class="mb-3">
                    <label class="text-muted small">Last Login</label>
                    <p class="mb-0" id="lastLogin">-</p>
                </div>
                <a href="{{ url('/profilePage') }}" class="btn btn-primary w-100">
                    <i data-feather="edit" style="width: 16px; height: 16px;"></i>
                    Edit Profile
                </a>
            </div>
        </div>
    </div>
    
    <!-- Admin Section -->
    <div class="col-md-6" id="adminSection" style="display: none;">
        <div class="card hover-lift">
            <div class="card-header bg-gradient-primary text-white">
                <i data-feather="bar-chart-2" style="width: 20px; height: 20px;"></i>
                Admin Metrics
            </div>
            <div class="card-body">
                <div class="text-center py-4">
                    <h1 class="display-4 text-gradient fw-bold mb-2" id="totalUsers">0</h1>
                    <p class="text-muted">Total Users</p>
                </div>
                <a href="{{ url('/admin/usersPage') }}" class="btn btn-primary w-100">
                    <i data-feather="users" style="width: 16px; height: 16px;"></i>
                    Manage Users
                </a>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
@vite(['resources/js/pages/dashboard.js'])
@endpush