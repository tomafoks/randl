<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('admin')->accessToken;

            $cookie = Cookie('jwt', $token, 3600);

            return response([
                'token' => $token,
            ])->withCookie($cookie);
        }

        return response([
            'error' => 'Invalid Credentials'
        ], 401);
    }

    function logout()
    {
        $cookie = Cookie::forget('jwt');
        return response([
            'message' => 'success',
        ])->withCookie($cookie);
    }

    function register(RegisterRequest $request)
    {
        $user = User::create($request->only('last_name', 'first_name', 'email')
            + ['password' => bcrypt($request->password)]);

        return response($user, 201);
    }
}
