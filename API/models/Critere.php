<?php

class Critere
{
    public $id;
    public $libelle;
    public $informations;
    private $connexion;
    private $table = "a_critere";

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

    public function creerAvecInformations()
    {
        $sql = "INSERT INTO a_critere SET Libelle=:libelle, Informations=:informations";
        $query = $this->connexion->prepare($sql);

        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->informations = htmlspecialchars(strip_tags($this->informations));

        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":informations", $this->informations);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function creerSansInformations()
    {
        $sql = "INSERT INTO a_critere SET Libelle=:libelle";
        $query = $this->connexion->prepare($sql);

        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $query->bindParam(":libelle", $this->libelle);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function modifierAvecInformations()
    {
        $sql = "UPDATE a_critere SET Libelle =:libelle, Informations =:informations WHERE ID_Critere = :idCritere";
        $query = $this->connexion->prepare($sql);

        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->informations = htmlspecialchars(strip_tags($this->informations));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":informations", $this->informations);
        $query->bindParam(":idCritere", $this->id);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function modifierSansInformations()
    {
        $sql = "UPDATE a_critere SET Libelle =:libelle WHERE ID_Critere = :idCritere";
        $query = $this->connexion->prepare($sql);

        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":idCritere", $this->id);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

}