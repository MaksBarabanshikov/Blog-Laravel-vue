<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\PostsController;

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

Route::group(['middleware' => 'api'], function () {
    Route::post('/login', [\App\Http\Controllers\Api\v1\AuthController::class, 'login']);
    Route::post('/register', [\App\Http\Controllers\Api\v1\AuthController::class, 'registration']);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('/logout',  [\App\Http\Controllers\Api\v1\AuthController::class, 'logout']);

        Route::get('/user', function (Request $request) {
            return $request -> user();
        });


        Route::prefix('blog')->group(function () {
            Route::resource('posts', PostsController::class)->only('index', 'show', 'store');
        });

        Route::prefix('posts')->group(function () {
            Route::post('/comment/{id}', [\App\Http\Controllers\Api\v1\CommentController::class, 'setComment']);
            Route::get('/comment/{id}', [\App\Http\Controllers\Api\v1\CommentController::class, 'getComments']);
        });
    });
});
