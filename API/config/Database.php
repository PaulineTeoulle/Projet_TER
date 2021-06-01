<?php

class Database
{
    public $connexion;
    private $host = "localhost";
    private $db_name = "test_matui";
    private $username = "root";
    private $password = "";


    public function getConnection()
    {
        $this->connexion = null;
        try {
            $this->connexion = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->connexion->exec('set names utf8');
        } catch (Exception $exception) {
            echo "Erreur de connexion à la BDD : " . $exception->getMessage();
        }
        return $this->connexion;
    }
}