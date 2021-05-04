<?php

class Methode
{
    public $id;
    public $libelle;
    public $description;
    public $effectif_preconise;
    public $donnees_produites;
    public $type_analyse;
    public $type_methode;
    public $exemple;
    public $id_decision;
    private $connexion;
    private $table = "a_methode";

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