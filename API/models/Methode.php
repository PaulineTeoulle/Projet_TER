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

    public function creer()
    {

        $sql = "INSERT INTO a_methode
                SET Libelle=:libelle, Description=:description, Effectif_preconise=:effectif_preconise, Donnees_produites=:donnees_produites, Type_analyse=:type_analyse,
                Type_methode=:type_methode,Exemple=:exemple, ID_Decision=:id_decision";
        $query = $this->connexion->prepare($sql);

        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->effectif_preconise = htmlspecialchars(strip_tags($this->effectif_preconise));
        $this->donnees_produites = htmlspecialchars(strip_tags($this->donnees_produites));
        $this->type_analyse = htmlspecialchars(strip_tags($this->type_analyse));
        $this->type_methode = htmlspecialchars(strip_tags($this->type_methode));
        $this->exemple = htmlspecialchars(strip_tags($this->exemple));
        $this->id_decision = htmlspecialchars(strip_tags($this->id_decision));

        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":description", $this->description);
        $query->bindParam(":effectif_preconise", $this->effectif_preconise);
        $query->bindParam(":donnees_produites", $this->donnees_produites);
        $query->bindParam(":type_analyse", $this->type_analyse);
        $query->bindParam(":type_methode", $this->type_methode);
        $query->bindParam(":exemple", $this->exemple);
        $query->bindParam(":id_decision", $this->id_decision);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

}