<?php

class Ressource
{
    public $id;
    public $nom;
    public $fichier;
    private $connexion;
    private $table = "a_ressource";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * FROM a_ressource";
        $query = $this->connexion->prepare($sql);
        $query->execute();// On retourne le résultat
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function supprimer()
    {
        $sql = " DELETE FROM a_ressource WHERE ID_Ressource=:id_ressource";
        $query = $this->connexion->prepare($sql);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $query->bindParam(":id_ressource", $this->id);
        if ($query->execute()) {
            return true;
        }
        return false;
    }
}