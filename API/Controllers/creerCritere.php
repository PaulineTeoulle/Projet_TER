<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../config/Database.php';
    include_once '../models/Critere.php';

    $database = new Database();
    $db = $database->getConnection();
    $critere = new Critere($db);

    $donnees = json_decode(file_get_contents("php://input"));
    if (!empty($donnees->libelle)) {
        if (empty($donnees->informations) || !isset($donnees->informations)) {
            $critere->libelle = $donnees->libelle;
            if ($critere->creerSansInformations()) {
                $critereResults = [
                    "libelle" => $critere->libelle
                ];
                echo json_encode(["message" => "L'ajout a été effectué"]);
            } else {
                echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
            }
        } else {
            $critere->informations = $donnees->informations;
            $critere->libelle = $donnees->libelle;
            if ($critere->creerAvecInformations()) {
                $critereResults = [
                    "libelle" => $critere->libelle,
                    "informations" => $critere->informations
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