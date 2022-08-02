<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentForm;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function setComment($id, CommentForm $request): array
    {
        $post = Post::findOrFail($id);

        $post -> comments() -> create($request->validated());

        return [$request->validated()];
    }
}
