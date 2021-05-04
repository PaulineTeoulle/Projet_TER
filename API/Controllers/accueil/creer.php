<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/Accueil.php';

    $database = new Database();
    $db = $database->getConnection();

    $accueil = new Accueil($db);

    $donnees = json_decode(file_get_contents("php://input"));

    if (!empty($donnees->description) && !empty($donnees->id)) {
        if ($accueil->creer()) {
            $accueil->id = $donnees->id;
            $accueil->description = $donnees->description;
            $prod = [
                "id" => $accueil->id,
                "description" => $accueil->description,
            ];
            echo json_encode($prod);


            http_response_code(200);
            echo json_encode(["message" => "L'ajout a été effectué"]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
        }
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}