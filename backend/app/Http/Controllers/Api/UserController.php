<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:55'],
            'username' => ['required', 'min:6', 'max:12'],
            'password' => ['required', 'min:6', 'max:15']
        ]);

        return dd($validated);
    }
}
