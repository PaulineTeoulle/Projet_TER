<?php

header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

$servername = "localhost";
$username = "root";
$password = "";

try {
  $conn = new PDO("mysql:host=$servername;dbname=corentin25200", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $conn->prepare("SELECT username FROM User");
  $stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
// return $result;

echo json_encode($result);
// $router = new Router;

// $router->get('/test ', function() {
//     return "Content";
// });