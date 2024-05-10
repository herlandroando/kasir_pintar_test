<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render('Login/Index');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->input(), [
            'nip' => 'required|exists:users,nip',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect('/login')->withErrors(['auth' => 'You have entered an invalid username or password']);
        }

        $input = $validator->validated();

        if (Auth::attempt($input)) {
            return redirect()->intended('/');
        }
    }

    public function logout(Request $request)
    {
        $request->session()->flush();

        Auth::logout();

        return redirect('login');
    }
}
