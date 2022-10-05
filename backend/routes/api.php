<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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
Route::group([

    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('register', [AuthController::class, 'register']);
    Route::post('/update/{id}', [AuthController::class, 'update']);
    Route::post('me', 'AuthController@me');


});
Route::get('/feed/{id}', [UserController::class, 'getUsers']);
Route::get('/profile/{id}', [UserController::class, 'getFavorites']);
Route::get('/view/{id}', [UserController::class, 'getUser']);
Route::post('/like', [UserController::class, 'likeUser']);
Route::post('/block', [UserController::class, 'blockUser']);
Route::post('/message', [UserController::class, 'addMessage']);
Route::post('/message/{id}', [UserController::class, 'getMessages']);
Route::get('/chat/{id}', [UserController::class, 'getMessageUsers']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
