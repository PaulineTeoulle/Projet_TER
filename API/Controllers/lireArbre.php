<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once '../config/Database.php';
    include_once '../models/Critere.php';
    include_once '../models/Decision.php';
    include_once '../models/Entree.php';
    include_once '../models/Methode.php';
    include_once '../models/MethodeRessource.php';
    include_once '../models/Ressource.php';
    include_once '../models/Sortie.php';

    $database = new Database();
    $db = $database->getConnection();

    $entree = new Entree($db);
    $critere = new Critere($db);
    $decision = new Decision($db);
    $methode = new Methode($db);
    $methodeRessource = new MethodeRessource($db);
    $ressource = new Ressource($db);
    $sortie = new Sortie($db);

    $entreeResults['entree'] = $entree->read();
    $critereResults['criteres'] = $critere->read();
    $decisionResults['decisions'] = $decision->read();
    $methodeResults['methodes'] = $methode->read();
    $methodeRessourceResults['methodesRessources'] = $methodeRessource->read();
    $ressourceResults['ressources'] = $ressource->read();
    $sortieResults['sortie'] = $sortie->read();

    $arrayResults = array_merge($entreeResults, $critereResults, $decisionResults, $methodeResults, $methodeRessourceResults, $ressourceResults, $sortieResults);
    echo json_encode($arrayResults);

} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}