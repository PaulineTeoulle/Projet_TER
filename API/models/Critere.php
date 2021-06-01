<?php

/**
 * Class Critere
 * @Goal : Read, Create, Delete Critere
 * @UsedByModule : Controllers/critere, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id, $libelle, $informations, $x, $y
 * @VisibleProcedures : lire(), creerAvecInformations(), creerSansInformations(), supprimer()
 */
class Critere
{
    /**
     * @var int id of accueil
     */
    public $id;
    /**
     * @var string libelle
     */
    public $libelle;
    /**
     * @var string|null libelle
     */
    public $informations;
    /**
     * @var int position x
     */
    public $x;
    /**
     * @var int position y
     */
    public $y;
    /**
     * @var PDO|null connexion of database
     */
    private $connexion;

    /**
     * Critere constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all critere
     * @return array
     */
    public function lire()
    {
        $sql = "SELECT * 
                FROM a_critere";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Create critere with informations
     * @return bool
     */
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

    /**
     * Create critere without informations
     * @return bool
     */
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

    /**
     * Delete all critere
     * @return bool
     */
    public function supprimer()
    {
        $sql = "DELETE FROM a_critere";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

}