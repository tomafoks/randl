<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use DB;
use Gate;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('view', 'roles');

        return RoleResource::collection(Role::all());
    }

    public function store(Request $request)
    {
        Gate::authorize('edit', 'roles');

        $role = Role::create($request->only('name'));

        if ($permissions = $request->permissions) {
            foreach ($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id,
                ]);
            }
        }

        return response(new RoleResource($role), 201);
    }

    public function show($id)
    {
        Gate::authorize('view', 'roles');

        return Role::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        Gate::authorize('edit', 'roles');

        $role = Role::findOrFail($id);
        $role->update($request->only('name'));

        DB::table('role_permission')->where('role_id', $role->id)->delete();

        if ($permissions = $request->permissions) {
            foreach ($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id,
                ]);
            }
        }

        return response(new RoleResource($role), 202);
    }

    public function destroy($id)
    {
        Gate::authorize('edit', 'roles');

        DB::table('role_permission')->where('role_id', $id)->delete();
        Role::destroy($id);
        return response(null, 204);
    }
}
