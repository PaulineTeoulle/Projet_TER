<?php

class MethodeRessource
{
    public $id;
    public $id_methode;
    public $id_ressource;
    private $connexion;
    private $table = "a_methoderessource";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * FROM " . $this->table;
        $query = $this->connexion->prepare($sql);
        $query->execute();
        // On retourne le résultat
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}