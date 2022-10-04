<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('users', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });
        Schema::dropIfExists('users');
        Schema::dropIfExists('user_types');
        Schema::dropIfExists('genders');
        // Create user types: id and type
        // Schema::create('user_types', function(Blueprint $table){
        //     $table->id();
        //     $table->string('type',10);
        //     $table->timestamps();

        // });

        // Create genders table: id and type
        Schema::create('genders', function(Blueprint $table){
            $table->id();
            $table->string('type',10);
            $table->timestamps();

        });

        // Create users table 
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name',50);
            $table->string('surname',50);
            $table->string('username',50)->unique();
            $table->string('email',50)->unique();
            $table->string('password',70);
            $table->date('dob');
            $table->string('location',100);
            $table->string('bio',300)->nullable();
            $table->binary('profile_picture')->nullable();
            $table->tinyInteger('hidden')->default('0');
            $table->timestamps();

            // References
            $table->foreignId('gender')->constrained('genders');
            $table->foreignId('preference')->constrained('genders');
            // $table->foreignId('user_type')->constrained('user_types');

        });

        // Create likes table
        Schema::create('likes', function (Blueprint $table){
            $table->id();
            $table->timestamps();

            // References
            $table->foreignId('sender_id')->constrained('users');
            $table->foreignId('receiver_id')->constrained('users');
        });

        // Create blocks table
        Schema::create('blocks', function (Blueprint $table){
            $table->id();
            $table->timestamps();

            // References
            $table->foreignId('sender_id')->constrained('users');
            $table->foreignId('receiver_id')->constrained('users');

        });

        // Create chats table
        Schema::create('chats', function (Blueprint $table){
            $table->id();
            $table->string('message', 300);
            $table->timestamps();

            // References
            $table->foreignId('sender_id')->constrained('users');
            $table->foreignId('receiver_id')->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
