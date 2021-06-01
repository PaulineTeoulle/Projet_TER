<?php

/**
 * Class MethodeRessource
 * @Goal : Read, Create, Delete link between methode and ressource
 * @UsedByModule : Controllers/methodeRessource, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id,$id_methode,$id_ressource
 * @VisibleProcedures : lire(), lireRessourcesMethode(), creer(), supprimer()
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
     * @return mixed
     */
    public function lire()
    {
        $sql = "SELECT * 
                FROM a_methoderessource";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Read all ressources linked to a methode
     * @return mixed
     */
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

    /**
     * Create a link between methode and ressource
     * @return bool
     */
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

    /**
     * Delete all links between methode and ressource
     * @return bool
     */
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