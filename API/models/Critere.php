<?php

class Critere
{
    public $id;
    public $libelle;
    public $informations;
    public $x;
    public $y;
    private $connexion;
    private $table = "a_critere";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * 
                FROM a_critere";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function creerAvecInformations()
    {
        $sql = "INSERT INTO a_critere 
                SET ID_Critere=:id_critere, Libelle=:libelle, Informations=:informations, x=:x, y=:y ";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->informations = htmlspecialchars(strip_tags($this->informations));
        $this->x = htmlspecialchars(strip_tags($this->x));
        $this->y = htmlspecialchars(strip_tags($this->y));

        $query->bindParam(":id_critere", $this->id);
        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":informations", $this->informations);
        $query->bindParam(":x", $this->x);
        $query->bindParam(":y", $this->y);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function creerSansInformations()
    {
        $sql = "INSERT INTO a_critere 
                SET ID_Critere=:id_critere, Libelle=:libelle, x=:x, y=:y ";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->x = htmlspecialchars(strip_tags($this->x));
        $this->y = htmlspecialchars(strip_tags($this->y));

        $query->bindParam(":id_critere", $this->id);
        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":x", $this->x);
        $query->bindParam(":y", $this->y);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

//    public function modifierAvecInformations()
//    {
//        $sql = "UPDATE a_critere SET Libelle =:libelle, Informations =:informations WHERE ID_Critere = :id_critere";
//        $query = $this->connexion->prepare($sql);
//
//        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
//        $this->informations = htmlspecialchars(strip_tags($this->informations));
//        $this->id = htmlspecialchars(strip_tags($this->id));
//
//        $query->bindParam(":libelle", $this->libelle);
//        $query->bindParam(":informations", $this->informations);
//        $query->bindParam(":id_critere", $this->id);
//        if ($query->execute()) {
//            return true;
//        }
//        return false;
//    }

//    public function modifierSansInformations()
//    {
//        $sql = "UPDATE a_critere SET Libelle =:libelle WHERE ID_Critere = :id_critere";
//        $query = $this->connexion->prepare($sql);
//
//        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
//        $this->id = htmlspecialchars(strip_tags($this->id));
//
//        $query->bindParam(":libelle", $this->libelle);
//        $query->bindParam(":id_critere", $this->id);
//        if ($query->execute()) {
//            return true;
//        }
//        return false;
//    }

    public function supprimer()
    {
        $sql = " DELETE FROM a_critere";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

}