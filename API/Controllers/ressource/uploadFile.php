<?php
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
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    } else {
        $upload_name = $upload_dir . $file_name;
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
        if (move_uploaded_file($file_tmp_name, $upload_name)) {
            $ressource->nom = $file_name;
            $ressource->fichier = $upload_name;
            if ($ressource->creer()) {
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "url" => $server_url . "/" . $upload_name
                );
            }

        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }
} else {
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}

echo json_encode($response);
?>