<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'nom', 'prenom','age', 'sexe', 'adresse', 'ville',
         'telephone','email', 'password','id_user',
    ];

    protected $hidden = [
        'password',
    ];

    public function investigation()
    {
        return $this->hasOne('App\Investigation');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
