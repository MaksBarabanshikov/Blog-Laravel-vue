<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminAuthFormRequest;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthController extends Controller
{
    public function login(AdminAuthFormRequest $request,): \Illuminate\Http\JsonResponse
    {
        $user = AdminUser::where('email', $request->get('email'))->firstOrFail();

        if (!Hash::check($request->get('password'), $user->password)) {
            throw new HttpException(404, 'Логин или пароль некорректный');
        }

        $token = $user->createToken('adminToken');
        return response()->json(['token' => $token]);
    }

    public function logout(Request $request): \Illuminate\Http\Response
    {
        $request->user('admin')->currentAccessToken()->delete();
        return response()->noContent();
    }
}
