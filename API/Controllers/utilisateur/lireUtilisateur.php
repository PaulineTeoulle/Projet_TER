<?php
/**
 * Controller to read User
 * @Goal : Read all users in database
 * @UsedByModule : componentDidMount() in User.js (/src/views/User.js)
 * @ModuleUsed : Database.php, Utilisateur.php
 * @VisibleVariables : $utilisateur, Message
 * @VisibleProcedures : None
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once '../../config/Database.php';
    include_once '../../models/Utilisateur.php';

    $database = new Database();
    $db = $database->getConnection();

    $utilisateur = new Utilisateur($db);

    $utilisateur = $utilisateur->read();
    echo json_encode($utilisateur);

} else {
    echo json_encode(["Message" => "Unauthorised method"]);
}