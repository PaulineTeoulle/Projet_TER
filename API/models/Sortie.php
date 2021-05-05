<?php

class Sortie
{
    public $id;
    public $message;
    public $id_decision;
    private $connexion;
    private $table = "a_sortie";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * FROM a_sortie";
        $query = $this->connexion->prepare($sql);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}