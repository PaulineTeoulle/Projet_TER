<?php
// Headers requis
// Accès depuis n'importe quel site ou appareil (*)
header("Access-Control-Allow-Origin: *");
// Format des données envoyées
header("Content-Type: application/json; charset=UTF-8");
// Méthode autorisée
header("Access-Control-Allow-Methods: PUT");
// Durée de vie de la requête
header("Access-Control-Max-Age: 3600");
// Entêtes autorisées
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // La bonne méthode est utilisée
// On inclut les fichiers de configuration et d'accès aux données
    include_once '../../config/Database.php';
    include_once '../../models/Accueil.php';

// On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

// On instancie l'accueil
    $accueil = new Accueil($db);

// On récupère les données reçues
    $donnees = json_decode(file_get_contents("php://input"));

// On vérifie qu'on a bien toutes les données
    if (!empty($donnees->description)) {
// On hydrate notre objet
        $accueil->description = $donnees->description;

        if ($accueil->modifier()) {
            http_response_code(200);
            echo json_encode(["message" => "La modification a été effectuée"]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "La modification n'a pas été effectuée"]);
        }
    }
} else {
    // Mauvaise méthode, on gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}