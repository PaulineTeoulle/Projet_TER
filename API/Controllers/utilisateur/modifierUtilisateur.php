<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    include_once '../../config/Database.php';
    include_once '../../models/Utilisateur.php';

    $database = new Database();
    $db = $database->getConnection();
    $utilisateur = new Utilisateur($db);

    $donnees = json_decode(file_get_contents("php://input"));

    if (isset($donnees->id_utilisateur) && !empty($donnees->role)) {
        $utilisateur->id = $donnees->id_utilisateur;
        $utilisateur->role = $donnees->role;

        if ($utilisateur->modifierRole()) {
            $utilisateur = $utilisateur->lire();
            echo json_encode($utilisateur);
            echo json_encode(["Message" => "Success"]);
        } else {
            echo json_encode(["Error" => "Failure"]);
        }
    }


} else {
    echo json_encode(["Message" => "Unauthorised method"]);

}