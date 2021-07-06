<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * User profile update
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function userProfileUpdate(Request $request){
        $user = Auth::user();
        $this->validate($request,[
           'name' => 'required',
           'email' => 'required|unique:users,email,'.$user->id,
           'password' => 'nullable|min:8|confirmed'
        ]);

        $user->update([
           'name' => $request->name,
           'email' => $request->email,
        ]);

        if ($request->password){
            $user->update([
                'password' => bcrypt($request->password)
            ]);
        }

        return response()->json($user, 200);
    }
}
