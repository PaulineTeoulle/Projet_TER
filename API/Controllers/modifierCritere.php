<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    include_once '../config/Database.php';
    include_once '../models/Critere.php';

    $database = new Database();
    $db = $database->getConnection();
    $critere = new Critere($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->libelle)) {
        if (empty($donnees->informations) || !isset($donnees->informations)) {
            $critere->libelle = $donnees->libelle;
            $critere->id = $donnees->id;
            if ($critere->modifierSansInformations()) {
                $critereResults = [
                    "libelle" => $critere->libelle
                ];
                echo json_encode(["message" => "La modification a été effectué"]);
            } else {
                echo json_encode(["message" => "La modification n'a pas été effectué"]);
            }
        } else {
            $critere->informations = $donnees->informations;
            $critere->libelle = $donnees->libelle;
            $critere->id = $donnees->id;
            if ($critere->modifierAvecInformations()) {
                $critereResults = [
                    "libelle" => $critere->libelle,
                    "informations" => $critere->informations
                ];
                echo json_encode(["message" => "La modification a été effectué"]);
            } else {
                echo json_encode(["message" => "La modification n'a pas été effectué"]);
            }
        }
    }
} else {
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}