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
    $lienMethodeRessource = new MethodeRessource($db);
    $donnees = json_decode(file_get_contents("php://input"));

    if (!empty($donnees->id_methode_ressource) && !empty($donnees->id_methode) && !empty($donnees->id_ressource)) {
        $lienMethodeRessource->id = $donnees->id_methode_ressource;
        $lienMethodeRessource->id_methode = $donnees->id_methode;
        $lienMethodeRessource->id_ressource = $donnees->id_ressource;
        if ($lienMethodeRessource->create()) {
            $lienResult = [
                "id" => $lienMethodeRessource->id,
                "id_methode" => $lienMethodeRessource->id_methode,
                "id_ressource" => $lienMethodeRessource->id_ressource,

            ];
            echo json_encode(["lienResult" => $lienResult]);
            echo json_encode(["Message" => "Success"]);
        } else {
            echo json_encode(["Error" => "Failure"]);
        }
    }
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}