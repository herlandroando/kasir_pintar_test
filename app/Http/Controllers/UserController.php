<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::orderBy('updated_at', 'desc')->whereNot('role', 'DIREKTUR');
        $result = $query->paginate(10);

        return Inertia::render('User/Index', [
            'data' => $result->items(),
            'meta' => [
                'currentPage' => $result->currentPage(),
                'lastPage' => $result->lastPage(),
                'total' => $result->total()
            ]
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip' => 'required|string|digits_between:1,18|numeric|unique:users,nip',
            'name' => 'required|string|max:250',
            'role' => 'required|string|in:STAFF,FINANCE',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = new User;

        $user->name = $validated['name'];
        $user->nip = $validated['nip'];
        $user->role = $validated['role'];
        $user->password = $validated['password'];
        $user->save();

        return redirect(route('users.edit', ['id' => $user->id]));
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('User/Edit', ['data' => $user]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:250',
            'role' => 'required|string|in:STAFF,FINANCE',
        ]);
        $user = User::findOrFail($id);

        $user->name = $validated['name'];
        $user->role = $validated['role'];
        $user->save();

        return redirect(route('users.edit', ['id' => $user->id]));
    }

    public function updatePassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user = User::findOrFail($id);

        $user->password = $validated['password'];
        $user->save();

        return redirect(route('users.edit', ['id' => $user->id]));
    }

    public function destroy($id)
    {
        $user = User::whereNot('role', 'DIREKTUR')->findOrFail($id);
        $user->delete();
        return redirect(route('users.index'));
    }
}
