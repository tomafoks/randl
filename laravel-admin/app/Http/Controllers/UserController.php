<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Resources\UserResourse;
use App\Models\User;
use Gate;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * @OA\Get(
     *      path="/users",
     *      summary="show all users",
     *      security={{"bearerAuth":{}}},
     *      tags={"Users"},
     *      @OA\Response(
     *          @OA\MediaType(
     *                  mediaType="application/json",
     *          ),
     *          response="200",
     *          description="User Collection",
     *      ),
     *      @OA\Parameter(
     *          name="page",
     *          description="page number",
     *          in="query",
     *          @OA\Schema(
     *              type="integer",
     *          )
     *      )
     * )
     */
    public function index()
    {
        Gate::authorize('view', 'users');
        $users = User::paginate();
        return UserResourse::collection($users);
    }

    /**
     * @OA\Post(
     *      path="/users",
     *      summary="create user",
     *      security={{"bearerAuth":{}}},
     *      tags={"Users"},
     *      @OA\Response(
     *          @OA\MediaType(
     *                  mediaType="application/json",
     *          ),
     *          response="201",
     *          description="User create",
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              ref="#/components/schemas/UserCreateRequest"
     *          )
     *      )
     * )
     */
    public function store(UserCreateRequest $request)
    {
        Gate::authorize('edit', 'users');
        $user = User::create($request->only('last_name', 'first_name', 'email', 'role_id')
            + ['password' => bcrypt(123)]);

        return response(new UserResourse($user), 201);
    }

    /**
     * @OA\Get(
     *      path="/users/{id}",
     *      summary="show user from id",
     *      security={{"bearerAuth":{}}},
     *      tags={"Users"},
     *      @OA\Response(
     *          @OA\MediaType(
     *                  mediaType="application/json",
     *          ),
     *          response="200",
     *          description="User",
     *      ),
     *      @OA\Parameter(
     *          name="id",
     *          description="id user",
     *          in="path",
     *          required=true,
     *          @OA\Schema(
     *              type="integer",
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        Gate::authorize('view', 'users');
        $user = User::findOrFail($id);
        return new UserResourse($user);
    }

    /**
     * @OA\Put(
     *      path="/users/{id}",
     *      summary="create user",
     *      security={{"bearerAuth":{}}},
     *      tags={"Users"},
     *      @OA\Response(
     *          @OA\MediaType(
     *                  mediaType="application/json",
     *          ),
     *          response="202",
     *          description="User update",
     *      ),
     *      @OA\Parameter(
     *          name="id",
     *          description="id user",
     *          in="path",
     *          required=true,
     *          @OA\Schema(
     *              type="integer",
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              ref="#/components/schemas/UserUpdateRequest"
     *          )
     *      )
     * )
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
     * @OA\Delete(
     *      path="/users/{id}",
     *      summary="deleted user",
     *      security={{"bearerAuth":{}}},
     *      tags={"Users"},
     *      @OA\Response(
     *          @OA\MediaType(
     *                  mediaType="application/json",
     *          ),
     *          response="204",
     *          description="User deleted",
     *      ),
     *      @OA\Parameter(
     *          name="id",
     *          description="id user",
     *          in="path",
     *          @OA\Schema(
     *              type="integer",
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        Gate::authorize('edit', 'users');
        User::destroy($id);
        return response(null, 204);
    }

    /**
     * @OA\Get(
     *      path="/user",
     *      summary="show user",
     *      security={{"bearerAuth":{}}},
     *      tags={"Profile"},
     *      @OA\Response(
     *          @OA\MediaType(
     *                  mediaType="application/json",
     *          ),
     *          response="200",
     *          description="User",
     *      )
     * )
     */
    public function user()
    {
        $user = Auth::user();
        return (new UserResourse($user))->additional([
            'data' => [
                'permissions' => $user->permissions(),
            ]
        ]);
    }

    /**
     * @OA\Put(
     *      path="/users/info",
     *      summary="Update user info",
     *      security={{"bearerAuth":{}}},
     *      tags={"Profile"},
     *      @OA\Response(
     *          @OA\MediaType(
     *              mediaType="application/json",
     *          ),
     *          response="202",
     *          description="Update user info",
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              ref="#/components/schemas/UpdateInfoRequest"
     *          )
     *      )
     * )
     */
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
    /**
     * @OA\Put(
     *      path="/users/password",
     *      summary="Update user password",
     *      security={{"bearerAuth":{}}},
     *      tags={"Profile"},
     *      @OA\Response(
     *          @OA\MediaType(
     *              mediaType="application/json",
     *          ),
     *          response="202",
     *          description="Update user password",
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              ref="#/components/schemas/UpdatePasswordRequest"
     *          )
     *      )
     * )
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user->update([
            'password' => bcrypt($request->password),
        ]);
        return response(new UserResourse($user), 202);
    }
}
