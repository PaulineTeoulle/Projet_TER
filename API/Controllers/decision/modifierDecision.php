<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    include_once '../../config/Database.php';
    include_once '../../models/Decision.php';

    $database = new Database();
    $db = $database->getConnection();
    $decision = new Decision($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->id) && !empty($donnees->libelle) && !empty($donnees->id_critere_entrant)) {
        $decision->libelle = $donnees->libelle;
        $decision->id = $donnees->id;
        $decision->id_critere_entrant = $donnees->id_critere_entrant;
        if (!empty($donnees->id_critere_sortant)) {
            $decision->id_critere_sortant = $donnees->id_critere_sortant;
            if ($decision->modifierAvecIDSortant()) {
                $decisionResults = [
                    "id" => $decision->id,
                    "libelle" => $decision->libelle,
                    "critere_sortant" => $decision->id_critere_sortant,
                    "critere_entrant" => $decision->id_critere_entrant
                ];

                echo json_encode($decisionResults);

                echo json_encode(["Message" => "Success"]);
            } else {
                echo json_encode(["Error" => "Failure"]);
            }
        } else {
            if ($decision->modifierSansIDSortant()) {
                $decisionResults = [
                    "id" => $decision->id,
                    "libelle" => $decision->libelle,
                    "id_critere_entrant" => $decision->id_critere_entrant,
                ];
                echo json_encode(["Message" => "Success"]);
            } else {
                echo json_encode(["Error" => "Failure"]);
            }
        }
    }
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}