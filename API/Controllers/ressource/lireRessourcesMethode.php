<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/MethodeRessource.php';

    $database = new Database();
    $db = $database->getConnection();

    $methodeRessource = new MethodeRessource($db);
    $donnees = json_decode(file_get_contents("php://input"));

    if (isset($donnees->id_methode)) {
        $methodeRessource->id_methode = $donnees->id_methode;
        $methodeRessource = $methodeRessource->lireRessourcesMethode();
        echo json_encode($methodeRessource);

    } else echo json_encode(["Erreur" => "ID non set"]);

} else {
    http_response_code(405);
    echo json_encode(["Erreur" => "La méthode n'est pas autorisée"]);
}
