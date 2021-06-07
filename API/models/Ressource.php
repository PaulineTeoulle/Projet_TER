<?php

/**
 * Class Ressource
 * @Goal : Read, Create, Delete ressource
 * @UsedByModule : Controllers/ressource, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id,$nom,$fichier
 * @VisibleProcedures : lire(), creer(), supprimer()
 */
class Ressource
{
    /**
     * @var int id of a ressource
     */
    public $id;
    /**
     * @var string name of a ressource
     */
    public $nom;
    /**
     * @var string path to a ressource
     */
    public $fichier;
    /**
     * @var PDO|null connexion to database
     */
    private $connexion;

    /**
     * Ressource constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all ressources
     * @return array
     */
    public function lire()
    {
        $sql = "SELECT * 
                FROM a_ressource";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function lireID()
    {
        $sql = "SELECT ID_Ressource
                FROM a_ressource WHERE Nom =:nom";
        $query = $this->connexion->prepare($sql);

        $this->nom = htmlspecialchars(strip_tags($this->nom));
        $query->bindParam(":nom", $this->nom);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Create a ressource
     * @return bool
     */
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

    /**
     * Delete all ressources
     * @return bool
     */
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