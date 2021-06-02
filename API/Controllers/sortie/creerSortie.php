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
    if (!empty($donnees->id_sortie) && !empty($donnees->message) && !empty($donnees->id_decision)&&!empty($donnees->x)&& !empty($donnees->y)) {
        $sortie->id = $donnees->id_sortie;
        $sortie->message = $donnees->message;
        $sortie->id_decision = $donnees->id_decision;
        $sortie->x = $donnees->x;
        $sortie->y = $donnees->y;

        if ($sortie->creer()) {
            $sortieResults = [
                "id" => $sortie->id,
                "message" => $sortie->message,
                "id_decision" => $sortie->id_decision,
                "x" => $sortie->x,
                "y" => $sortie->y
            ];
            echo json_encode(["sortieResults" => $sortieResults]);
            echo json_encode(["Message" => "Success"]);
        } else {
            echo json_encode(["Error" => "Failure"]);
        }
    }
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}