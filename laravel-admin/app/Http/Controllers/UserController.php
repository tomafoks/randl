<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResourse;
use App\Models\User;
use Gate;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * @OA\Get(path="/users",
     *  @OA\Response(response="200",
     *      description="User Collection",
     *  )
     * )
     */

    public function index()
    {
        Gate::authorize('view', 'users');
        $users = User::paginate();
        return UserResourse::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserCreateRequest $request)
    {
        Gate::authorize('edit', 'users');
        $user = User::create($request->only('last_name', 'first_name', 'email', 'role_id')
            + ['password' => bcrypt(123)]);

        return response(new UserResourse($user), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        Gate::authorize('view', 'users');
        $user = User::findOrFail($id);
        return new UserResourse($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, $id)
    {
        Gate::authorize('edit', 'users');
        $user = User::findOrFail($id);
        $user->update($request->only([
            'last_name',
            'first_name',
            'email',
            'role_id',
        ]));
        return response(new UserResourse($user), 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Gate::authorize('edit', 'users');
        User::destroy($id);
        return response(null, 204);
    }

    public function user()
    {
        $user = Auth::user();
        return (new UserResourse($user))->additional([
            'data' => [
                'permissions' => $user->permissions(),
            ]
        ]);
    }

    // Обновление профиля юзера
    public function updateInfo(UpdateInfoRequest $request)
    {
        $user = Auth::user();
        $user->update($request->only([
            'last_name',
            'first_name',
            'email',
        ]));
        return response(new UserResourse($user), 202);
    }

    // Обновление пароля юзера
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user->update([
            'password' => bcrypt($request->password),
        ]);
        return response(new UserResourse($user), 202);
    }
}
