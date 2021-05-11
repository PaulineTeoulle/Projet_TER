<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/Decision.php';

    $database = new Database();
    $db = $database->getConnection();
    $decision = new Decision($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->libelle) && !empty($donnees->id_critere_entrant)) {
        $decision->libelle = $donnees->libelle;
        if (!empty($donnees->id_critere_sortant)) {
            $decision->id_critere_entrant = $donnees->id_critere_entrant;
            $decision->id_critere_sortant = $donnees->id_critere_sortant;

            if ($decision->creerAvecCritereSortant()) {
                $decisionResults = [
                    "libelle" => $decision->libelle,
                    "id_critere_entrant" => $decision->id_critere_entrant,
                    "id_critere_sortant" => $decision->id_critere_sortant
                ];
                echo json_encode(["message" => "L'ajout a été effectué"]);
            } else {
                echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
            }
        } else {
            $decision->libelle = $donnees->libelle;
            $decision->id_critere_entrant = $donnees->id_critere_entrant;

            if ($decision->creerSansCritereSortant()) {
                $decisionResults = [
                    "libelle" => $decision->libelle,
                    "id_critere_entrant" => $decision->id_critere_entrant,
                ];
                echo json_encode(["message" => "L'ajout a été effectué"]);
            } else {
                echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
            }
        }
    }
} else {
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}