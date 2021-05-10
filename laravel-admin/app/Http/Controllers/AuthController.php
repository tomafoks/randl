<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('admin')->accessToken;
            return [
                'token' => $token,
            ];
        }

        return response([
            'error' => 'Invalid Credentials'
        ], 401);
    }

    function register(RegisterRequest $request)
    {
        $user = User::create($request->only('last_name', 'first_name', 'email')
            + ['password' => bcrypt($request->password)]);

        return response($user, 201);
    }
}
