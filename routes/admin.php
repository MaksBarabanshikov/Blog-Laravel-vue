<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'admin'], function () {
    Route::post('/login', [\App\Http\Controllers\Admin\AuthController::class, 'login']);
    Route::middleware("auth:admin")->group(function () {
        Route::post('/logout', [\App\Http\Controllers\Admin\AuthController::class, 'logout']);
        Route::resource('admin-posts', \App\Http\Controllers\Admin\PostController::class);
        Route::resource('admin-users', \App\Http\Controllers\Admin\UsersController::class);
    });
});


