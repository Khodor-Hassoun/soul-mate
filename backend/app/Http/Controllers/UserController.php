<?php

namespace App\Http\Controllers;

use App\Models\Block;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Like;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    //
    // Get all users
    // function getUsers(){
    //     $users = User::all();
    //     return response()->json([
    //         "status" => "Success",
    //         "data" => $users
    //     ]);
    // }

    // Get user but favorites
    function getFavorites($id){
        // $users = DB::table('users')
        //     ->join('likes', 'users.id', '=', 'likes.sender_id')
        //     ->where('users.id', '=', $id)
        //     ->select('')
        //     ->get();
        $likedUsers = Like::
                        where('sender_id', '=', $id)
                        ->select('receiver_id')
                        ->get()->toArray();
        
        // $array = (array) $likedUsers;

        $users = DB::table('users')
                    ->whereIn('id', $likedUsers)
                    ->get();


        
        // $users = User::all();
        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);
    }
    
    // Get users except blocked
    function getUsers($id){
        $user = User::find($id);
        $blockedUsers = Block::
                        where('sender_id', '=', $id)
                        ->select('receiver_id')
                        ->get()->toArray();

        $users = DB::table('users')
            ->whereNotIn('id', $blockedUsers)
            ->where('id' , '!=', $id)
            ->where('gender', $user->preference)
            // ->orWhereNot('id',$id)
            ->get();


        return response()->json([
            "status" => "Success",
            "data" => $users,
            'page_user' => $user
        ]);
    }
}
