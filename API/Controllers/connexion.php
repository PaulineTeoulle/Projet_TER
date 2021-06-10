<?php

/**
 * Controller connexion
 * @Goal : Generate unique JWT Token if username and password are in database (if connexion succeed)
 * @UsedByModule : login() in AuthApi.js (/src/services/AuthApi.js)
 * @ModuleUsed : Database.php, Utilisateur.php
 * @VisibleVariables : Token, ErrorPassword, Message
 * @VisibleProcedures : None
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../config/Database.php';
    include_once '../models/Utilisateur.php';

    $database = new Database();
    $db = $database->getConnection();
    $utilisateur = new Utilisateur($db);

    $donnees = json_decode(file_get_contents("php://input"));

    if (isset($donnees->username) && !empty($donnees->mot_de_passe)) {
        $utilisateur->pseudo = $donnees->username;
        $utilisateur->mot_de_passe =$donnees->mot_de_passe;

        $hash = $utilisateur->readPassword();
        if (password_verify($utilisateur->mot_de_passe, $hash["Mot_de_passe"])) {
            $utilisateur = $utilisateur->readOne();
            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            $payload = json_encode(['user_id' => $utilisateur["ID_Utilisateur"], 'user_username' => $utilisateur["Pseudo"], 'user_role' => $utilisateur["Role"], 'user_mail' => $utilisateur["Mail"], 'exp' => time()+ 60 * 60]);
            $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
            $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
            $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
            $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

            $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
            http_response_code(200);
            echo json_encode(["token" => $jwt]);
        } else {
            http_response_code(404);
            echo json_encode(["ErrorPassword" => "Invalid Password"]);
        }

    }

} else {
    http_response_code(405);
    echo json_encode(["Message" => "Unauthorised method"]);

}