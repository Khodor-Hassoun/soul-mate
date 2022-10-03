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


        // $user->username = $request->username ? $request->username : $user->name;
        // $user->email = $request->email ? $request->email : $user->email;
        // $user->gender = $request->gender ? $request->gender : $user->gender;
        // $user->location = $request->location ? $request->location : $user->location;
        // $user->dob = $request->dob ? $request->dob : $user->dob;
        // $user->preference = $request->preference ? $request->preference : $user->preference;
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
        if(!isset($user->password) || empty($user->password)){
            $user->password = $user->password;
        }else{
            $user->password = bcrypt($request->password);
        }

        // $newImage = time().'-'. explode('/', explode(':', substr($request->profile_picture,0,strpos($request->profile_picture,';')))[1])[1];
        // $request->profile_picture->move(public_path('images'),$newImage);

        // $imageName = time().'.'.$request->profile_picture->extension();

        // Public Folder
        // $request->image->move(public_path('images'), $imageName);

        // $folderPath = "public/images";
        
        // $base64Image = explode(";base64,", $request->profile_picture);
        // $explodeImage = explode("image/", $base64Image[0]);
        // $imageType = $explodeImage[1];
        // $image_base64 = base64_decode($base64Image[1]);
        // $file = $folderPath . uniqid() . '. '.$imageType;
        
        // file_put_contents($file, $image_base64);
        
        // $folderPath = public_path('images');

        // $image_parts = explode(";base64,", $request->profile_picture);
        // $image_type_aux = explode("image/", $image_parts[0]);
        // $image_type = $image_type_aux[1];
        // $image_base64 = base64_decode($image_parts[1]);
        // $file = $folderPath . uniqid() . '. '.$image_type;

        // file_put_contents($file, $image_base64);
        // $image = $request->profile_picture;  // your base64 encoded
        // $image = str_replace('data:image/png;base64,', '', $image);
        // $image = str_replace(' ', '+', $image);
        // $imageName = time().'.'.'png';
        // \File::put(storage_path(). '/' . $imageName, base64_decode($image));


        
        $img = $request->profile_picture;
        $folderPath = "public\images"; //path location
        
        $image_parts = explode(";base64,", $img);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $uniqid = uniqid();
        $file = $folderPath . $uniqid . '.'.$image_type;
        file_put_contents($file, $image_base64);


        // $newImage = time().'-'.$request->username.'-'.$request->profile_picture->extension();
        // $request->profile_picture->move(public_path('images'),$newImage);
        // dd($newImage);

        $user->username = $request->username ? $request->username : $user->name;
        $user->email = $request->email ? $request->email : $user->email;
        $user->gender = $request->gender ? $request->gender : $user->gender;
        $user->location = $request->location ? $request->location : $user->location;
        $user->dob = $request->dob ? $request->dob : $user->dob;
        $user->preference = $request->preference ? $request->preference : $user->preference;
        $user->profile_picture = $file;
        $user->bio = $request->bio ? $request->bio : $user->bio;

        
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
