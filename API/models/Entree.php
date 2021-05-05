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
        $sql = "SELECT * FROM a_entree";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function modifier()
    {
        $sql = "UPDATE a_entree SET Date =:date, ID_Critere =:id_critere WHERE ID_Entree = 1";
        $query = $this->connexion->prepare($sql);

        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->critere = htmlspecialchars(strip_tags($this->critere));

        $query->bindParam(":date", $this->date);
        $query->bindParam(":id_critere", $this->critere);
        if ($query->execute()) {
            return true;
        }
        return false;
    }
}