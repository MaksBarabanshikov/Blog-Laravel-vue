<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthController extends Controller
{
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            "email" => ["required", "email", "string"],
            "password" => ["required"]
        ]);

        if (!auth('admin')->attempt($data)) {
            throw new HttpException(404,'Пользователь не найден' );
        }

        $user = $request->user('admin');
        $token = $user -> createToken('adminToken');
        return response()->json(['token' => $token]);
    }

    public function logout(Request $request): \Illuminate\Http\Response
    {
        $request->user('admin')->currentAccessToken()->delete();
        return response()->noContent();
    }
}
