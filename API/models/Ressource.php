<?php

/**
 * Class Ressource
 * @Goal : Read ressource, Create ressource, Delete ressource
 * @UsedByModule : Controllers/ressource, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id,$nom,$fichier
 * @VisibleProcedures : read(), readIDFromName(), countNameFile(), create(), delete(), deleteOne()
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
    public function read()
    {
        $sql = "SELECT * 
                FROM a_ressource";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Read id from a ressource name
     * @return array
     */
    public function readIDFromName()
    {
        $sql = "SELECT ID_Ressource
                FROM a_ressource WHERE Nom =:nom";
        $query = $this->connexion->prepare($sql);

        $this->nom = htmlspecialchars(strip_tags($this->nom));
        $query->bindParam(":nom", $this->nom);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Read id from a ressource name
     * @return array
     */
    public function readNameFromID()
    {
        $sql = "SELECT Nom
                FROM a_ressource WHERE ID_Ressource =:id_ressource";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $query->bindParam(":id_ressource", $this->id);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Count number of specific file
     * @return mixed
     */
    public function countNameFile(){
        $sql = "SELECT COUNT(*)
                FROM a_ressource 
                WHERE Nom= :nom";
        $query = $this->connexion->prepare($sql);

        $this->nom = htmlspecialchars(strip_tags($this->nom));
        $query->bindParam(":nom", $this->nom);

        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Create a ressource
     * @return bool
     */
    public function create()
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
    public function delete()
    {
        $sql = " DELETE FROM a_ressource";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Delete a specific ressource
     * @return bool
     */
    public function deleteOne()
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