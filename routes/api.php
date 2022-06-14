<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\PostsController;
use App\Http\Controllers\Api\v1\RegisterControllerApi;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum') -> get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->prefix('auth')->group( function ($router) {
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('refresh', [\App\Http\Controllers\AuthController::class, 'refresh']);
    Route::post('me', [\App\Http\Controllers\AuthController::class, 'me']);

    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::prefix('blog') -> group(function () {
            Route::resource('posts', PostsController::class);
        });
        Route::prefix('posts') -> group(function () {
            Route::post('/comment/{id}', [\App\Http\Controllers\Api\v1\CommentController::class, 'setComment']);
            Route::get('/comment/{id}', [\App\Http\Controllers\Api\v1\CommentController::class, 'getComments']);
        });
    });
});

Route::prefix('auth') -> group(function () {
    Route::post('/register', [RegisterControllerApi::class, 'register'] );
});

