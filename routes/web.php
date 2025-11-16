<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::get('/', function () {
    return redirect('/loginPage');
});

Route::get('/loginPage', function () {
    return view('auth.login');
})->name('login');

Route::get('/registerPage', function () {
    return view('auth.register');
})->name('register');

Route::get('/dashboardPage', function () {
    return view('pages.dashboard');
})->name('dashboard');

Route::get('/profilePage', function () {
    return view('pages.profile');
})->name('profile');

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('/usersPage', function () {
        return view('pages.admin.users');
    })->name('admin.users');
});
