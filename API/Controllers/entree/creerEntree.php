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

    if (isset($donnees->date)) {
        $entree->date = $donnees->date;
    } else {
        $entree->date = date("Y-m-d");
    }

    if (!empty($donnees->id_critere)) {
        $entree->critere = $donnees->id_critere;
        if ($entree->creer()) {
            $entreeResults = [
                "date" => $entree->date,
                "critere" => $entree->critere

            ];
            echo json_encode(["message" => "L'ajout a été effectué"]);
        } else {
            echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
        }
    }
} else {
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}