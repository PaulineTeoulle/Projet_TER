<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/Utilisateur.php';

    $database = new Database();
    $db = $database->getConnection();
    $utilisateur = new Utilisateur($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->mail) && !empty($donnees->pseudo) && !empty($donnees->mot_de_passe)) {
        $utilisateur->mail = $donnees->mail;
        $utilisateur->pseudo = $donnees->pseudo;
        $utilisateur->mot_de_passe = password_hash($donnees->mot_de_passe, PASSWORD_DEFAULT);

        if ($utilisateur->creer()) {
            $utilisateurResults = [
                "mail" => $utilisateur->mail,
                "pseudo" => $utilisateur->pseudo,
                "mot_de_passe" => $utilisateur->mot_de_passe,

            ];
            echo json_encode(["message" => "L'ajout a été effectué"]);
        } else {
            echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
        }
    }
} else {
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}