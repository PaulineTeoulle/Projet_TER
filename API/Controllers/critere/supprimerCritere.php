<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    include_once '../../config/Database.php';
    include_once '../../models/Critere.php';

    $database = new Database();
    $db = $database->getConnection();
    $critere = new Critere($db);

    if ($critere->delete()) {
        echo json_encode(["Message" => "Success"]);
    } else {
        echo json_encode(["Error" => "Failure"]);
    }
} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}