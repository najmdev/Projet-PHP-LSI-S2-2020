<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
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

class AuthController extends Controller
{
    public function registerPatient(Request $request)
    {
        $user = User::create([
            'type' => 'patient',
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
        ]);
        $patient = Patient::create([
            'nom' => $request->json()->get('nom'),
            'prenom' => $request->json()->get('prenom'),
            'age' => $request->json()->get('age'),
            'sexe' => $request->json()->get('sexe'),
            'adresse' => $request->json()->get('adresse'),
            'ville' => $request->json()->get('ville'),
            'telephone' => $request->json()->get('telephone'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'id_user' => $user->id,
        ]);
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user','token'),201);
    }
    
    public function registerDocteur(Request $request)
    {
        $user = User::create([
            'type' => 'docteur',
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
        ]);
        $docteur = Docteur::create([
            'nom' => $request->json()->get('nom'),
            'prenom' => $request->json()->get('prenom'),
            'adresse' => $request->json()->get('adresse'),
            'ville' => $request->json()->get('ville'),
            'telephone' => $request->json()->get('telephone'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'id_user' => $user->id,
        ]);
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user','token'),201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json( compact('token') );
    }

    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

    public function allUsers() {
        return User::all();
    }

    public function allPatients() {
        return Patient::all();
    }

    public function allDocteurs() {
        return Docteur::all();
    }
}
