<?php
$servername = "localhost";
$username = "root";
$password = "";

try {
  $conn = new PDO("mysql:host=$servername;dbname=corentin25200", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
  $stmt = $conn->prepare("SELECT username FROM User");
  $stmt->execute();
  $result = $stmt->fetchAll();
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
return $result;


// $conn->close();
?>