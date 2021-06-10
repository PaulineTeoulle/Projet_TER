<?php
/**
 * Controller to upload file in directory and database
 * @Goal : Upload file in directory and database if it does'nt exist
 * @UsedByModule :
 * @ModuleUsed : Database.php, Ressource.php
 * @VisibleVariables : $response, $id
 * @VisibleProcedures : None
 */

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

$response = array();
$upload_dir = '../../../src/public/documentsRessources/';
$server_url = 'http://127.0.0.1:8000';

if ($_FILES['file']) {
    include_once '../../config/Database.php';
    include_once '../../models/Ressource.php';
    $database = new Database();
    $db = $database->getConnection();
    $ressource = new Ressource($db);

    $file_name = $_FILES["file"]["name"];
    $file_tmp_name = $_FILES["file"]["tmp_name"];
    $error = $_FILES["file"]["error"];

    if ($error > 0) {
        echo json_encode(["Error" => "Error uploading the file"]);
    } else {
        $upload_name = $upload_dir . $file_name;
        $ressource->nom = $file_name;
        $ressource->fichier = $upload_name;
        if ($ressource->countNameFile()['COUNT(*)'] == 0) {
            if (move_uploaded_file($file_tmp_name, $upload_name)) {
                if ($ressource->create()) {
                    $id = $ressource->readIDFromName();
                    http_response_code(200);
                    echo json_encode([$id, "Message" => "File uploaded successfully."]);
                }
            } else {
                http_response_code(304);
                echo json_encode(["Error" => "Error uploading the file."]);
            }
        } else {
            http_response_code(304);
            echo json_encode(["Error" => "File already added (same name), choose another file."]);
        }
    }
} else {
    http_response_code(204);
    echo json_encode(["Error" => "No file was sent."]);
}

