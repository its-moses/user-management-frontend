@extends('layouts.dashboard')

@section('title', 'Profile')
@section('nav-profile', 'active')

@section('dashboard-content')
<div class="row justify-content-center">
    <div class="col-lg-8">
        <div class="card shadow-custom-lg">
            <div class="card-header">
                <i data-feather="user" style="width: 20px; height: 20px;"></i>
                My Profile
            </div>
            <div class="card-body p-4">
                <form id="profileForm">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" disabled>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="email" disabled>
                        </div>
                    </div>

                    <div class="d-flex gap-2 justify-content-end">
                        <button type="button" class="btn btn-primary" id="editBtn">
                            <i data-feather="edit" style="width: 16px; height: 16px;"></i>
                            Edit Profile
                        </button>
                        <button type="submit" class="btn btn-success" id="saveBtn" style="display: none;">
                            <i data-feather="save" style="width: 16px; height: 16px;"></i>
                            Save Changes
                        </button>
                        <button type="button" class="btn btn-secondary" id="cancelBtn" style="display: none;">
                            <i data-feather="x" style="width: 16px; height: 16px;"></i>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
@vite(['resources/js/pages/profile.js'])
@endpush