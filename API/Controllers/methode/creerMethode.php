<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/Methode.php';

    $database = new Database();
    $db = $database->getConnection();
    $methode = new Methode($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->libelle) && !empty($donnees->description) && !empty($donnees->effectif_preconise) && !empty($donnees->donnees_produites) &&
        !empty($donnees->type_analyse) && !empty($donnees->type_methode) && !empty($donnees->exemple) && !empty($donnees->id_decision)) {
        $methode->libelle = $donnees->libelle;
        $methode->description = $donnees->description;
        $methode->effectif_preconise = $donnees->effectif_preconise;
        $methode->donnees_produites = $donnees->donnees_produites;
        $methode->type_analyse = $donnees->type_analyse;
        $methode->type_methode = $donnees->type_methode;
        $methode->exemple = $donnees->exemple;
        $methode->id_decision = $donnees->id_decision;

        if ($methode->creer()) {
            $methodeResults = [
                "libelle" => $methode->libelle,
                "description" => $methode->description,
                "effectif_preconise" => $methode->effectif_preconise,
                "donnees_produites" => $methode->donnees_produites,
                "type_analyse" => $methode->type_analyse,
                "type_methode" => $methode->type_methode,
                "exemple" => $methode->exemple,
                "id_decision" => $methode->id_decision
            ];
            echo json_encode(["message" => "L'ajout a été effectué"]);
        } else {
            echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
        }
    }
} else {
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}