<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Docteur extends Model
{
    protected $fillable = [
        'nom', 'prenom', 'adresse', 'ville',
        'telephone', 'email', 'password', 'id_user',
    ];

    protected $hidden = [
        'password',
    ];

    public function investigation()
    {
        return $this->hasMany('App\Investigation');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
