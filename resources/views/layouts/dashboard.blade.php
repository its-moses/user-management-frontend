@extends('layouts.app')

@section('content')
<nav class="navbar navbar-expand-lg navbar-custom sticky-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="{{ url('/dashboardPage') }}">
            <i data-feather="box"></i>
            UserMS
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link @yield('nav-dashboard')" href="{{ url('/dashboardPage') }}">
                        <i data-feather="home" style="width: 16px; height: 16px;"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @yield('nav-profile')" href="{{ url('/profilePage') }}">
                        <i data-feather="user" style="width: 16px; height: 16px;"></i>
                        Profile
                    </a>
                </li>
                
                <li class="nav-item nav-admin d-none">
                    <a class="nav-link @yield('nav-users')" href="{{ url('/admin/usersPage') }}">
                        <i data-feather="users" style="width: 16px; height: 16px;"></i>
                        Manage Users
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="handleLogout(); return false;">
                        <i data-feather="log-out" style="width: 16px; height: 16px;"></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<main class="py-4">
    <div class="container">
        @yield('dashboard-content')
    </div>
</main>

<script type="module">
    // import Auth from ''

    window.handleLogout = async function() {
        const result = await Swal.fire({
            title: 'Logout?',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            }
        });

        if (result.isConfirmed) {
            await Auth.logout();
        }
    };
</script>
@endsection