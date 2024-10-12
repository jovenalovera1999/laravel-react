<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:55'],
            'age' => ['required', 'numeric'],
            'gender' => ['required'],
            'birth_date' => ['required', 'date'],
            'username' => ['required', 'min:6', 'max:12'],
            'password' => ['required', 'min:6', 'max:15']
        ]);

        User::create([
            'name' => $validated['name'],
            'age' => $validated['age'],
            'gender_id' => $validated['gender'],
            'birth_date' => $validated['birth_date'],
            'username' => $validated['username'],
            'password' => bcrypt($validated['password'])
        ]);

        return response()->json([
            'status' => 200
        ]);
    }

    public function processLogin(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'min:6', 'max:12'],
            'password' => ['required', 'min:6', 'max:15']
        ]);

        if (Auth::attempt($validated)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'status' => 200
            ]);
        }
    }
}
