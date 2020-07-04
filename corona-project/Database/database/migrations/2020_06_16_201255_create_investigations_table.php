<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestigationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('investigations', function (Blueprint $table) {
            $table->id();
            $table->string('question1');
            $table->string('question2');
            $table->string('question3')->nullable();
            $table->string('question4')->nullable();
            $table->string('question5')->nullable();
            $table->boolean('traite')->default(false);
            $table->bigInteger('id_patient')->unsigned();
            $table->bigInteger('id_docteur')->unsigned()->nullable();
            $table->foreign('id_patient')->references('id')
                ->on('patients')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->foreign('id_docteur')->references('id')
                ->on('docteurs')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('investigations');
    }
}
