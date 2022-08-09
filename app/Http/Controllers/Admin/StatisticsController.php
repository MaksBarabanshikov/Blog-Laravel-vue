<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $posts = Post::all() -> count();
        $users = User::all() -> count();

        return response() -> json(['posts' => $posts, 'users' => $users]);
    }
}
