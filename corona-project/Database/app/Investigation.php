<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Investigation extends Model
{
    protected $fillable = [
        'question1', 'question2','question3',
         'question4', 'question5', 'id_patient',
    ];
    
    public function patient()
    {
        return $this->belongsTo('App\Patient');
    }

    public function docteur()
    {
        return $this->belongsTo('App\Docteur');
    }
}
