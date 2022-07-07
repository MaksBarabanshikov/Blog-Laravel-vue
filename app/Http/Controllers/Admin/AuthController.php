<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminAuthFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthController extends Controller
{
    public function login(AdminAuthFormRequest $request,): \Illuminate\Http\JsonResponse
    {
        if (!Auth::guard('admin')->attempt($request->only('email', 'password'), true)) {
            throw new HttpException(404, 'Логин или пароль некорректный');
        }

        $user  = $request->user('admin');
        $token = $user->createToken('adminToken');
        return response()->json(['token' => $token]);
    }

    public function logout(Request $request): \Illuminate\Http\Response
    {
        $request->user('admin')->currentAccessToken()->delete();
        return response()->noContent();
    }
}
