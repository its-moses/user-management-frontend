<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CheckSanctumAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // public function handle(Request $request, Closure $next)
    // {
    //     $token = $request->cookie('auth_token');

    //     if (!$token) {
    //         return redirect('/loginPage');
    //     }

    //     $response = Http::withHeaders([
    //         'Authorization' => 'Bearer ' . $token,
    //         'Accept' => 'application/json'
    //     ])->get(env('BACKEND_URL') . '/api/user');

    //     if ($response->status() === 401) {
    //         return redirect('/loginPage');
    //     }

    //     return $next($request);
    // }

    private $backendUrl = 'http://127.0.0.1:8000';
    public function handle(Request $request, Closure $next)
    {
        Log::info('CheckSanctumAuth: Started', [
            'url' => $request->url(),
            'ip'  => $request->ip()
        ]);

        // 1️⃣ Check if cookie exists
        $token = $request->cookie('auth_token');

        if (!$token) {
            Log::warning('CheckSanctumAuth: Missing auth_token cookie', [
                'cookies' => $request->cookies->all()
            ]);
            return redirect('/loginPage');
        }

        Log::info('CheckSanctumAuth: Found token in cookie', [
            'token_preview' => substr($token, 0, 10) . '...'
        ]);

        // 2️⃣ Validate token with backend
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json'
            ])->get($this->backendUrl . '/api/user');

            Log::info('CheckSanctumAuth: Backend response received', [
                'status' => $response->status(),
                'body'   => $response->json(),
            ]);

            // 3️⃣ Backend says "unauthorized"
            if ($response->status() === 401) {
                Log::warning('CheckSanctumAuth: Backend returned 401 - invalid token', [
                    'token_preview' => substr($token, 0, 10) . '...'
                ]);
                return redirect('/loginPage');
            }
        } catch (\Exception $e) {
            Log::error('CheckSanctumAuth: Error calling backend /api/user', [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine()
            ]);

            return redirect('/loginPage');
        }

        Log::info('CheckSanctumAuth: Token verified, access granted');
        return $next($request);
    }
}
