<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Chat;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Like;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{


    // Get user but favorites
    function getFavorites($id){

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

    function getUser($id){
        $viewUser = User::find($id);
        return response()->json([
            "status" => "Success",
            "data" => $viewUser
        ]);
    }

    function likeUser(Request $request){
        $like = new Like;
        $like->sender_id = $request->sender_id;
        $like->receiver_id = $request->receiver_id;
        if($like->save()){
            return response()->json([
                'status' => 'success'
            ]);
        }else{
            return response()->json([
                'status' => 'Fail'
            ]);
        }
    }

    function blockUser(Request $request){
        $block = new Block;
        $block->sender_id = $request->sender_id;
        $block->receiver_id = $request->receiver_id;
        if($block->save()){
            return response()->json([
                'status' => 'success'
            ]);
        }else{
            return response()->json([
                'status' => 'Fail'
            ]);
        }
    }

    function addMessage(Request $request){
        $chat = new Chat;
        $chat->sender_id = $request->sender_id;
        $chat->receiver_id = $request->receiver_id;
        $chat->message = $request->message;
        if($chat->save()){
            return response()->json([
                'status' => 'success'
            ]);
        }else{
            return response()->json([
                'status' => 'Fail'
            ]);
        }
    }

    function getMessages(Request $request, $id){
        $userID = $id;
        $receiver_id = $request->receiver_id;
        $messages = Chat::
                    where('sender_id', $id)
                    ->where('receiver_id', $request->receiver_id)
                    ->orWhere(function($query) use ($userID, $receiver_id){
                        $query->where('sender_id', $receiver_id)
                                ->where('receiver_id', $userID);
                    })
                    ->get();


        return response()->json([
            "status" => "Success",
            "data" => $messages
        ]);

        
    }
}
