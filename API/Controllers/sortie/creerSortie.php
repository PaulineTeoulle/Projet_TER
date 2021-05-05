<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/Sortie.php';

    $database = new Database();
    $db = $database->getConnection();
    $sortie = new Sortie($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->message) && !empty($donnees->id_decision)) {
        $sortie->message = $donnees->message;
        $sortie->id_decision = $donnees->id_decision;
        if ($sortie->creer()) {
            $sortieResults = [
                "message" => $sortie->message,
                "id_decision" => $sortie->id_decision

            ];
            echo json_encode(["message" => "L'ajout a été effectué"]);
        } else {
            echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
        }
    }
} else {
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}