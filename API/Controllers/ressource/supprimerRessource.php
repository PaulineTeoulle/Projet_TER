<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    include_once '../../config/Database.php';
    include_once '../../models/Ressource.php';

    $database = new Database();
    $db = $database->getConnection();
    $ressource = new Ressource($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->id_ressource)) {
        $ressource->id = $donnees->id_ressource;
        if ($ressource->supprimer()) {
            echo json_encode(["message" => "La suppression a été effectué"]);
        } else {
            echo json_encode(["message" => "La suppression n'a pas été effectué"]);
        }
    }
} else {
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}