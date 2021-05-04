<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once '../../config/Database.php';
    include_once '../../models/Accueil.php';

    $database = new Database();
    $db = $database->getConnection();

    $accueil = new Accueil($db);
    $accueil->lire();

    if ($accueil->description != null) {
        $prod = [
            "id" => $accueil->id,
            "description" => $accueil->description,
        ];

        http_response_code(200);
        echo json_encode($prod);

    } else {
        http_response_code(404);
        echo json_encode(array("message" => "N'existe pas."));
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}