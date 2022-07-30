<?php

namespace App\Http\Resources;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Post
 */
class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'preview'     => $this->preview,
            'thumbnail'   => $this->thumbnail,
            'comments'    => CommentResource::collection($this->whenLoaded('comments')),
            'created_at'  => $this->created_at
        ];
    }
}
