<?php

/**
 * Controller to delete a specific file
 * @Goal : Delete a specific file
 * @UsedByModule :
 * @ModuleUsed : Database.php, Ressource.php
 * @VisibleVariables : Message, Error
 * @VisibleProcedures : None
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    include_once '../../config/Database.php';
    include_once '../../models/Ressource.php';

    $database = new Database();
    $db = $database->getConnection();
    $ressource = new Ressource($db);

    $donnees = json_decode(file_get_contents("php://input"));
    echo json_encode($donnees);
    if (!empty($donnees->id)) {
        $ressource->id = $donnees->id;
        $ressource->nom = $ressource->readNameFromID()['Nom'];
        //echo $ressource->nom;
        $file_pointer = "/var/www/matui/API/documentsRessources/". $ressource->nom;
        if (unlink($file_pointer)) {
            echo json_encode(["Message" => "Success"]);
        } else {
            echo json_encode(["Message" => "Failure"]);
        }
        if ($ressource->deleteOne()) {
            http_response_code(200);
            echo json_encode(["Message" => "Success"]);
        } else {
            http_response_code(304);
            echo json_encode(["Error" => "Failure"]);
        }
    }
} else {
    http_response_code(405);
    echo json_encode(["Message" => "Unauthorised method"]);
}