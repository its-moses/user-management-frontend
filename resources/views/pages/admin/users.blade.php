@extends('layouts.dashboard')

@section('title', 'Manage Users')
@section('nav-users', 'active')

@section('dashboard-content')
<div class="row mb-4">
    <div class="col-12">
        <h2 class="text-gradient fw-bold">User Management</h2>
        <p class="text-muted">Manage all system users</p>
    </div>
</div>

<div class="card shadow-custom-lg">
    <div class="card-header">
        <div class="row align-items-center">
            <div class="col-md-6 mb-3 mb-md-0">
                <div class="input-group">
                    <span class="input-group-text bg-white">
                        <i data-feather="search" style="width: 16px; height: 16px;"></i>
                    </span>
                    <input type="text" class="form-control" id="searchInput" placeholder="Search users...">
                </div>
            </div>
            <div class="col-md-6 text-md-end">
                <button class="btn btn-primary" id="addUserBtn">
                    <i data-feather="user-plus" style="width: 16px; height: 16px;"></i>
                    Add New User
                </button>
            </div>
        </div>
    </div>
    
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover table-striped mb-0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="usersTableBody">
                    <tr>
                        <td colspan="7" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="text-muted mt-2">Loading users...</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <div class="card-footer">
        <div id="paginationContainer"></div>
    </div>
</div>
@endsection

@push('scripts')
@vite(['resources/js/pages/admin-users.js'])
@endpush