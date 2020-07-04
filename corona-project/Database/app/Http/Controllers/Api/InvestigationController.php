<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Investigation;
use App\Patient;
use App\Docteur;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;
use Illuminate\Support\Facades\DB;

class InvestigationController extends Controller
{
    public function registerInvestigation(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $patient = Patient::where('id_user', $user->id) -> first();
        $investigation = Investigation::create([
            'question1' => $request->json()->get('question1'),
            'question2' => $request->json()->get('question2'),
            'question3' => $request->json()->get('question3'),
            'question4' => $request->json()->get('question4'),
            'question5' => $request->json()->get('question5'),
            'id_patient' => $patient->id,
        ]);
        return $investigation;
    }

    public function allInvestigations() {
        return Investigation::all();
    }

    public function investigationsTraite() {
        return Investigation::where('id_docteur','!=',null)->orderBy('updated_at','DESC')->get();
    }

    public function investigationsNonTraite() {
        return Investigation::where('id_docteur','=',null)->orderBy('created_at','DESC')->get();
    }

    public function updateInvestigation(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $docteur = Docteur::where('id_user', $user->id) -> first();
        $investigation = Investigation::findOrFail($id);
        $investigation->id_docteur = $docteur->id;
        $investigation->traite = $request->json()->get('resultat');
        $investigation->update(array($investigation));
        return $investigation;
    }

    public function requete1($ville){
        $table = DB::select("select COUNT(*) as nbr from patients where 
        ( ville = '$ville' AND id IN (select id_patient from investigations where
        (id_docteur IS NOT NUll AND traite = 0) ))
        UNION
        select COUNT(*) as nbr from patients where 
        ( ville = '$ville' AND id IN (select id_patient from investigations where
        (id_docteur IS NOT NUll AND traite = 1) ))");
        return $table;
    }

    public function totalVilles(){
        $dates=array(
            "Tanger"=>0,
            "Tétouan"=>0,
            "Al Houceima"=>0,
            "Chefchaouen"=>0,
            "Larache"=>0,
            "Asilah"=>0
        );
        $dates["Tanger"]=$this->requete1("Tanger");
        $dates["Tétouan"]=$this->requete1("Tétouan");
        $dates["Al Houceima"]=$this->requete1("Al Houceima");
        $dates["Chefchaouen"]=$this->requete1("Chefchaouen");
        $dates["Larache"]=$this->requete1("Larache");
        $dates["Asilah"]=$this->requete1("Asilah");
        return $dates;
    }

    public function requete2($date){
        $date1 = $date.' 00:00:01';
        $date2 = $date.' 23:59:59';
        $table = DB::select("select COUNT(*) as nbr from patients where 
        ( id IN (select id_patient from investigations where
        (id_docteur IS NOT NUll AND traite = 0 
        AND updated_at > '$date1' AND updated_at < '$date2') ))
        UNION
        select COUNT(*) as nbr from patients where 
        ( id IN (select id_patient from investigations where
        (id_docteur IS NOT NUll AND traite = 1 
        AND updated_at > '$date1' AND updated_at < '$date2') ))");
        return $table;
    }

    public function totalDates($date){
        $dates=array(
            "jour1"=>0,
            "jour2"=>0,
            "jour3"=>0,
            "jour4"=>0,
            "jour5"=>0,
            "jour6"=>0,
            "jour7"=>0,
            "jour8"=>0,
            "jour9"=>0,
            "jour10"=>0
        );
        for($i=0;$i<10;$i++){
            $dates["jour".(10-$i)]=$this->requete2($date);
            $date = date('Y-m-d',strtotime(''.$date)-1);
        }
        return $dates;
    }

}