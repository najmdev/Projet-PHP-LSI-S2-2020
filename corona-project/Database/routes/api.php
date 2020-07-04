<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/registerPatient', 'Api\AuthController@registerPatient');
Route::post('/registerDocteur', 'Api\AuthController@registerDocteur');
Route::post('/registerInvestigation', 'Api\InvestigationController@registerInvestigation');
Route::post('/login', 'Api\AuthController@login');
Route::get('/getAuthenticatedUser', 'Api\AuthController@getAuthenticatedUser');
Route::get('/allUsers', 'Api\AuthController@allUsers');
Route::get('/allPatients', 'Api\AuthController@allPatients');
Route::get('/allDocteurs', 'Api\AuthController@allDocteurs');
Route::get('/allInvestigations', 'Api\InvestigationController@allInvestigations');
Route::get('investigationsTraite', 'Api\InvestigationController@investigationsTraite');
Route::get('/investigationsNonTraite', 'Api\InvestigationController@investigationsNonTraite');
Route::put('/updateInvestigation/{id}', 'Api\InvestigationController@updateInvestigation');
Route::get('/totalVilles', 'Api\InvestigationController@totalVilles');
Route::get('/totalDates/{date}', 'Api\InvestigationController@totalDates');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
