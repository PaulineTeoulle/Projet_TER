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
        $sql = "SELECT * 
                FROM a_methoderessource";
        $query = $this->connexion->prepare($sql);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function lireRessourcesMethode()
    {
        $sql = "SELECT r.ID_Ressource, r.Nom, r.Fichier 
                FROM a_ressource r INNER JOIN a_methoderessource mr ON r.ID_Ressource = mr.ID_Ressource 
                WHERE mr.ID_Methode=:id_methode";
        $query = $this->connexion->prepare($sql);
        $this->id_methode = htmlspecialchars(strip_tags($this->id_methode));
        $query->bindParam(":id_methode", $this->id_methode);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function creer()
    {
        $sql = "INSERT INTO a_methoderessource
                SET ID_MethodeRessource=:id_methode_ressource, ID_Methode=:id_methode, ID_Ressource=:id_ressource ";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->id_methode = htmlspecialchars(strip_tags($this->id_methode));
        $this->id_ressource = htmlspecialchars(strip_tags($this->id_ressource));
        $query->bindParam(":id_methode_ressource", $this->id);
        $query->bindParam(":id_methode", $this->id_methode);
        $query->bindParam(":id_ressource", $this->id_ressource);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function supprimer()
    {
        $sql = "DELETE FROM a_methoderessource ";
        $query = $this->connexion->prepare($sql);

        if ($query->execute()) {
            return true;
        }
        return false;
    }
}