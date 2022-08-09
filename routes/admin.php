<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\StatisticsController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Api\v1\CommentController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'admin'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware("auth:admin")->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::resource('admin-posts', PostController::class)
            ->only('index', 'show', 'store', 'update', 'destroy');
        Route::resource('admin-users', UsersController::class);

        Route::prefix('posts')->group(function () {
            Route::post('/comment/{id}', [CommentController::class, 'setComment']);
            Route::get('/comment/{id}', [CommentController::class, 'getComments']);
        });

        Route::get('/statistics', StatisticsController::class);
    });
});


