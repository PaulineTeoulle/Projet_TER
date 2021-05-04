<?php

class Decision
{
    public $id;
    public $libelle;
    public $id_critere_entrant;
    public $id_critere_sortant;
    private $connexion;
    private $table = "a_decision";

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