<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string',
        ]);


        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' =>$request->gender,
            'preference' =>  $request->preference,
            'dob' => $request->dob,
            'location' => $request->location,
            'first_name' =>$request->first_name,
            'surname' =>$request->surname
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function update(Request $request, $id){
        $user = User::find($id);
        // if(!isset($user->password) || empty($user->password)){
        //     $user->password = $user->password;
        // }else{
        //     $user->password = bcrypt($request->password);
        // }
        // if(!isset($request->password) || empty($request->password)){
        //     $user->password = $user->password;
        // }else $user->password = bcrypt($request->password);

        if($request->password == null){
            $user->password = $user->password;
        }else $user->password = bcrypt($request->password);
        
        $user->username = $request->username ? $request->username : $user->username;
        $user->email = $request->email ? $request->email : $user->email;
        $user->gender = $request->gender ? $request->gender : $user->gender;
        $user->location = $request->location ? $request->location : $user->location;
        $user->dob = $request->dob ? $request->dob : $user->dob;
        $user->preference = $request->preference ? $request->preference : $user->preference;
        $user->profile_picture = $request->profile_picture ? $request->profile_picture : $user->profile_picture;
        $user->bio = $request->bio ? $request->bio : $user->bio;
        $user->first_name = $request->first_name ? $request->first_name : $user->first_name;
        $user->surname = $request->surname ? $request->surname : $user->surname;
        $user->hidden = $request->hidden;

        
        if($user->save()){
            $token = Auth::login($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
                
            ]);
        }
        
        
        // $token = Auth::login($user);
        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'User created successfully',
        //     'user' => $user,
            // 'authorisation' => [
            //     'token' => $token,
            //     'type' => 'bearer',
            // ]
        // ]);
    }
}
