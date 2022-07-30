<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostFormRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class PostController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $posts = Post::with(['comments.user'])->paginate(5);

        return PostResource::collection($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(PostFormRequest $request): JsonResource
    {
        $data = $request->validated();

        if ($request->has('thumbnail')) {
            $thumbnail = $request->get('thumbnail');
            $fileName  = Carbon::now()->timestamp . '_' . uniqid() . '.' . explode('/',
                    explode(':', substr($thumbnail, 0, strpos($thumbnail, ';')))[1])[1];

            Image::make($thumbnail)->save(public_path('/storage/posts/') . $fileName);
            $data['thumbnail'] = '/storage/posts/' . $fileName;
        }

        $post = Post::create($data);

        return PostResource::make($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                "status"  => false,
                "message" => "Post not found",
            ], 404);
        }

        $comments = $post->comments()->get();

        $user = $comments->map(function ($comment) {
            return $comment->user()->get("name");
        });

        return response()->json([
            "post"     => $post,
            "comments" => $comments,
            "user"     => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(PostFormRequest $request, int $id): JsonResponse
    {
        $post = Post::find($id);

        $data = $request->validated();

        if ($request->has('thumbnail')) {
            $thumbnail = $request->get('thumbnail');
            $fileName  = Carbon::now()->timestamp . '_' . uniqid() . '.' . explode('/',
                    explode(':', substr($thumbnail, 0, strpos($thumbnail, ';')))[1])[1];
            Image::make($thumbnail)->save(public_path('/storage/posts/') . $fileName);
            $data['thumbnail'] = '/storage/posts/' . $fileName;
        }

        $post->update($data);

        return response()->json(['message' => 'Успешно'], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(int $id): Response
    {
        Post::destroy($id);
        return response()->noContent();
    }
}
