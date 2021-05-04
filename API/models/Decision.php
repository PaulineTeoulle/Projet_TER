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

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function creerAvecCritereSortant()
    {

        $sql = "INSERT INTO a_decision SET Libelle=:libelle, ID_Critere_entrant=:id_critere_entrant, ID_Critere_sortant=:id_critere_sortant";
        $query = $this->connexion->prepare($sql);

        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->id_critere_entrant = htmlspecialchars(strip_tags($this->id_critere_entrant));
        $this->id_critere_sortant = htmlspecialchars(strip_tags($this->id_critere_sortant));

        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":id_critere_entrant", $this->id_critere_entrant);
        $query->bindParam(":id_critere_sortant", $this->id_critere_sortant);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function creerSansCritereSortant()
    {
        $sql = "INSERT INTO a_decision SET Libelle=:libelle, ID_Critere_entrant=:id_critere_entrant";
        $query = $this->connexion->prepare($sql);

        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->id_critere_entrant = htmlspecialchars(strip_tags($this->id_critere_entrant));

        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":id_critere_entrant", $this->id_critere_entrant);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

}