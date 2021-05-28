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
        $sql = "SELECT * 
                FROM a_ressource";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function creer()
    {
        $sql = "INSERT INTO a_ressource 
                SET Nom=:nom, Fichier=:fichier";
        $query = $this->connexion->prepare($sql);

        $this->nom = htmlspecialchars(strip_tags($this->nom));
        $this->fichier = htmlspecialchars(strip_tags($this->fichier));

        $query->bindParam(":nom", $this->nom);
        $query->bindParam(":fichier", $this->fichier);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function supprimer()
    {
        $sql = " DELETE FROM a_ressource";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }
}