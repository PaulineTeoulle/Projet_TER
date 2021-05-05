<?php

class Database
{

    public $connexion;
    private $host = "localhost";
    private $db_name = "api_matui";
    private $username = "root";
    private $password = "123456789";

    public function getConnection()
    {

        $this->connexion = null;

        try {
            $this->connexion = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->connexion->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }

        return $this->connexion;
    }
}