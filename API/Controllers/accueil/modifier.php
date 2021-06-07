<?php
/**
 * Controller to update accueil description
 * @Goal : Update accueil description
 * @UsedByModule : edit() in Home.js (/src/views/Home.js)
 * @ModuleUsed : Database.php, Accueil.php
 * @VisibleVariables : $accueilResult, Message, Error
 * @VisibleProcedures : None
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    include_once '../../config/Database.php';
    include_once '../../models/Accueil.php';

    $database = new Database();
    $db = $database->getConnection();
    $accueil = new Accueil($db);

    $donnees = json_decode(file_get_contents("php://input"));

    if (!empty($donnees->description)) {
        $accueil->description = $donnees->description;
        if ($accueil->updateDescription()) {
            $accueilResult = [
                "description" => $accueil->description,
            ];
            echo json_encode($accueilResult);
            echo json_encode(["Message" => "Success"]);
        } else {
            echo json_encode(["Error" => "Failure"]);
        }
    }
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}