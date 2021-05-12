<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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


} else {
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}