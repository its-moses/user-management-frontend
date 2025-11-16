@extends('layouts.app')

@section('content')
<div class="min-vh-100 d-flex align-items-center justify-content-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="text-center mb-4">
                    <h1 class="text-white fw-bold mb-2">User Management</h1>
                    <p class="text-white opacity-75">@yield('subtitle', 'Welcome back')</p>
                </div>
                
                <div class="card shadow-custom-lg">
                    <div class="card-body p-4 p-md-5">
                        @yield('auth-content')
                    </div>
                </div>
                
                @yield('extra-links')
            </div>
        </div>
    </div>
</div>
@endsection