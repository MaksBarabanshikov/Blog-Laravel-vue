<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class MostCommentedController extends Controller
{
    public function __invoke()
    {
        $comments = Post::withCount('comments') -> orderBy('comments_count', 'desc') -> take(3) -> get();

        return response() -> json($comments);
    }
}
