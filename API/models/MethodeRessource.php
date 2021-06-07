<?php

/**
 * Class MethodeRessource (link between methode and ressource)
 * @Goal : Read methodeRessource, Create methodeRessource, Delete methodeRessource
 * @UsedByModule : Controllers/methodeRessource, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id,$id_methode,$id_ressource
 * @VisibleProcedures : read(), readRessourcesMethode(), create(), delete()
 */
class MethodeRessource
{
    /**
     * @var int id of a link between a methode and a ressource
     */
    public $id;
    /**
     * @var int id of a methode
     */
    public $id_methode;
    /**
     * @var int id of a ressource
     */
    public $id_ressource;
    /**
     * @var PDO|null connexion to database
     */
    private $connexion;

    /**
     * MethodeRessource constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all links between methode and ressource
     * @return array
     */
    public function read()
    {
        $sql = "SELECT * 
                FROM a_methoderessource";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Read all ressources linked to a methode
     * @return array
     */
    public function readRessourcesMethode()
    {
        $sql = "SELECT r.ID_Ressource, r.Nom, r.Fichier 
                FROM a_ressource r INNER JOIN a_methoderessource mr ON r.ID_Ressource = mr.ID_Ressource 
                WHERE mr.ID_Methode=:id_methode";
        $query = $this->connexion->prepare($sql);

        $this->id_methode = htmlspecialchars(strip_tags($this->id_methode));

        $query->bindParam(":id_methode", $this->id_methode);

        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create a link between methode and ressource
     * @return bool
     */
    public function create()
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

    /**
     * Delete all links between methode and ressource
     * @return bool
     */
    public function delete()
    {
        $sql = "DELETE FROM a_methoderessource ";
        $query = $this->connexion->prepare($sql);

        if ($query->execute()) {
            return true;
        }
        return false;
    }
}