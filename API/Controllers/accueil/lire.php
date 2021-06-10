<?php

/**
 * Controller to read accueil
 * @Goal : Read accueil description
 * @UsedByModule : getHomeContent() in Home.js (/src/views/Home.js)
 * @ModuleUsed : Database.php, Accueil.php
 * @VisibleVariables : $accueilResult, Message
 * @VisibleProcedures : None
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once '../../config/Database.php';
    include_once '../../models/Accueil.php';

    $database = new Database();
    $db = $database->getConnection();

    $accueil = new Accueil($db);
    $accueil->read();

    if ($accueil->description != null) {
        $accueilResult = [
            "description" => $accueil->description,
        ];
        http_response_code(200);
        echo json_encode($accueilResult);
    } else {
        http_response_code(204);
        echo json_encode(array("Message" => "Description doesn't exist."));
    }
} else {
    http_response_code(405);
    echo json_encode(["Message" => "Unauthorised method"]);
}