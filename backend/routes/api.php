<?php

use App\Http\Controllers\Api\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(StudentController::class)->group(function () {
    Route::get('/students', 'index');
    Route::get('/student/edit/{student_id}', 'edit');

    Route::post('/student/store', 'store');
    Route::put('/student/update/{student_id}', 'update');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
