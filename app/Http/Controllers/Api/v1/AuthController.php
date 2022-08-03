<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Models\User;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->get('email'))->firstOrFail();

        if (!Hash::check($request->get('password'), $user -> password)) {
            throw new HttpException(404, 'Некорректный логин или пароль ');
        }

        $token = $user->createToken('token');

        return response()->json($token, 200);

    }

    public function logout(Request $request): \Illuminate\Http\Response
    {
        $request->user('api')->currentAccessToken()->delete();

        return response() -> noContent();
    }

    public function registration(RegisterRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = User::create($request->validated());

        $token = $user -> createToken('token');

        return response()->json($token, 200);
    }
}
