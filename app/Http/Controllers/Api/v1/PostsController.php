<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostFormRequest;
use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        $posts = Post::with(['comments.user'])->paginate(5);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PostFormRequest  $request
     * @return JsonResource
     */
    public function store(PostFormRequest $request): JsonResource
    {
        $data = $request->validated();

        if ($request->has('thumbnail')) {
            $thumbnail = $request->get('thumbnail');
            $fileName  = Carbon::now()->timestamp . '_' . uniqid('', true) . '.' . explode('/',
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
     * @return JsonResource
     */
    public function show(int $id): JsonResource
    {
        $post = Post::with('comments.user')->findOrFail($id);

        return PostResource::make($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
