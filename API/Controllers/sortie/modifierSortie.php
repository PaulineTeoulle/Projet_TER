<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    include_once '../../config/Database.php';
    include_once '../../models/Sortie.php';

    $database = new Database();
    $db = $database->getConnection();
    $sortie = new Sortie($db);

    $donnees = json_decode(file_get_contents("php://input"));

    if (isset($donnees->message)) {
        $sortie->message = $donnees->message;
        if (isset($donnees->id_decision)) {
            $sortie->id_decision = $donnees->id_decision;

            if ($sortie->modifierAvecDecision()) {
                $sortieResults = [
                    "message" => $sortie->message,
                    "decision" => $sortie->id_decision
                ];
                echo json_encode($sortieResults);
                echo json_encode(["Message" => "Success"]);
            } else {
                echo json_encode(["Error" => "Failure"]);
            }
        } else {

            if ($sortie->modifierSansDecision()) {
                $sortieResults = [
                    "message" => $sortie->message,
                ];
                echo json_encode($sortieResults);
                echo json_encode(["Message" => "Success"]);
            } else {
                echo json_encode(["Error" => "Failure"]);
            }
        }
    }


} else {
    echo json_encode(["Message" => "Unauthorised method"]);

}