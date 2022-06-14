<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            "email" => ["required", "email", "string"],
            "password" => ["required"]
        ]);



        if (auth('admin')->attempt($data)) {
           return response() -> json(["message" => "Успешно"]);
        }
        return response() -> json(["message" => "Пользователь не найден"],400);
    }
}
