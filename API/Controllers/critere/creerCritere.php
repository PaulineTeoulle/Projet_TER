<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../../config/Database.php';
    include_once '../../models/Critere.php';

    $database = new Database();
    $db = $database->getConnection();
    $critere = new Critere($db);

    $donnees = json_decode(file_get_contents("php://input"));

    if (!empty($donnees->id_critere) && !empty($donnees->libelle) && !empty($donnees->x) && !empty($donnees->y)) {
        $critere->id = $donnees->id_critere;
        $critere->libelle = $donnees->libelle;
        $critere->informations = $donnees->informations;
        $critere->x = $donnees->x;
        $critere->y = $donnees->y;
        if ($critere->informations == null) {
            if ($critere->creerSansInformations()) {
                $critereResults = [
                    "id" => $critere->id,
                    "libelle" => $critere->libelle,
                    "informations" => $critere->informations,
                    "x" => $critere->x,
                    "y" => $critere->y
                ];
                echo json_encode(["critereResults" => $critereResults]);
                echo json_encode(["Message" => "Success"]);
            } else {
                echo json_encode(["Error" => "Failure"]);
            }

        } else {
            if ($critere->creerAvecInformations()) {
                $critereResults = [
                    "id" => $critere->id,
                    "libelle" => $critere->libelle,
                    "informations" => $critere->informations,
                    "x" => $critere->x,
                    "y" => $critere->y
                ];
                echo json_encode(["critereResults" => $critereResults]);
                echo json_encode(["Message" => "Success"]);
            } else {
                echo json_encode(["Error" => "Failure"]);
            }
        }
    }
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}