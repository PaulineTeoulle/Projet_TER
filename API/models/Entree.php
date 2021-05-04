<?php

class Entree
{
    public $id;
    public $date;
    public $critere;
    private $connexion;
    private $table = "a_entree";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * FROM " . $this->table;
        $query = $this->connexion->prepare($sql);
        $query->execute();
        //return $query;
        // On retourne le résultat

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
        /*$row = $query->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['ID_Entree'];
        $this->date = $row['Date'];
        $this->critere = $row['ID_Critere'];
        return $this;*/
    }
}