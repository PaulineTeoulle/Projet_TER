<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/Entree.php';

    $database = new Database();
    $db = $database->getConnection();
    $entree = new Entree($db);
    $donnees = json_decode(file_get_contents("php://input"));
    $entree->date = date("Y-m-d");

    if (!empty($donnees->id_entree) && !empty($donnees->id_critere) && !empty($donnees->x) && !empty($donnees->y)) {
        $entree->id = $donnees->id_entree;
        $entree->critere = $donnees->id_critere;
        $entree->x = $donnees->x;
        $entree->y = $donnees->y;
        if ($entree->creer()) {
            $entreeResults = [
                "id" => $entree->id,
                "date" => $entree->date,
                "critere" => $entree->critere,
                "x" => $entree->x,
                "y" => $entree->y,

            ];
            echo json_encode(["entreeResults" => $entreeResults]);
            echo json_encode(["Message" => "Success"]);
        } else {
            echo json_encode(["Error" => "Failure"]);
        }
    }
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}