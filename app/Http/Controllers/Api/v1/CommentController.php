<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentForm;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CommentController extends Controller
{
    public function setComment($id, CommentForm $request): array
    {
        $post = Post::findOrFail($id);

        $post -> comments() -> create($request->validated());

        return [$request->validated()];
    }

    public function getComments($id): AnonymousResourceCollection
    {
        $comments = Comment::with('user')->where('post_id', $id) -> get();

        return CommentResource::collection($comments);
    }


}
