<?php

/**
 * Controller to read all ressources
 * @Goal : Read all ressources
 * @UsedByModule : Tree.js
 * @ModuleUsed : Database.php, Ressource.php
 * @VisibleVariables :  $ressources['ressources'] , Message
 * @VisibleProcedures : None
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once '../../config/Database.php';
    include_once '../../models/Ressource.php';

    $database = new Database();
    $db = $database->getConnection();

    $ressource = new Ressource($db);
    $ressources['ressources'] = $ressource->read();
    echo json_encode(["ressources" =>  $ressources['ressources']]);
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}