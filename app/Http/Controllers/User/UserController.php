<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public $loadDefault = 10;
    public function index(Request $request)
    {
        $users = User::query()->with('roles');
        if ($request->has('startdate') || $request->has('enddate')) {
            $users->where(function ($query) use ($request) {
                if ($request->has('startdate')) {
                    $query->where('created_at', '>=', $request->startdate);
                } else {
                    $query->where('created_at', '>=', Carbon::today()->toDateString());
                }
                if ($request->has('enddate')) {
                    $query->where('created_at', '<=', Carbon::parse($request->enddate)->addDay());
                } else {
                    $query->where('created_at', '<=', Carbon::today()->addDay()->toDateString());
                }
            });
        } else {
            $users->whereBetween('users.created_at', [Carbon::today()->toDateString(), Carbon::today()->addDay()->toDateString()]);
        }
        if ($request->q) {
            $users->where('name','like','%'.$request->q.'%')
            ->orWhere('email','like','%'.$request->q.'%');
        }
        if ($request->has(['field','direction'])) {
            $users->orderBy($request->field,$request->direction);
        }
        $users = (
            UserResource::collection($users->latest()->fastPaginate($request->load ?? $this->loadDefault)->withQueryString())
        )->additional([
            'attributes' => [
                'total' => 1100,
                'per_page' =>10,
            ],
            'filtered' => [
                'load' => $request->load ?? $this->loadDefault,
                'q' => $request->q ?? '',
                'jenis' => $request->jenis ?? 'belumperiksa',
                'page' => $request->page ?? 1,
                'field' => $request->field ?? '',
                'direction' => $request->direction ?? '',
            ]
        ]);
        $roles = Role::get();
        // $roles = Role::pluck('name', 'id');
        return inertia('Users/Basic/Index',['users'=>$users, 'roles'=>$roles]);
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            // 'roles' => ['required', 'array'],
        ]);
        $request->merge([
            'password' => Hash::make('password'),
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        $user->syncRoles($request->input('roles'));

        return back()->with([
            'type' => 'success',
            'message' => 'User berhasil dibuat',
        ]);
    }
    public function update(Request $request, User $user)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email','unique:users,email,'. optional($user)->id],
        ]);
        $user->update($validated);
        $user->syncRoles($request->input('roles'));
        return back()->with([
            'type' => 'success',
            'message' => 'User berhasil diubah',
        ]);
    }
    public function destroy(User $user)
    {
        $user->delete();
        return back()->with([
            'type' => 'success',
            'message' => 'User berhasil dihapus',
        ]);
    }
}
