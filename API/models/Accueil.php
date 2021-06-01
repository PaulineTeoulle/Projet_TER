<?php

/**
 * Class Accueil
 * @Goal : Read, Create, Update Accueil Content
 * @UsedByModule : Controllers/accueil, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id, $description
 * @VisibleProcedures : lire(), modifier(), creer()
 */
class Accueil
{
    /**
     * @var int id of accueil
     */
    public $id;
    /**
     * @var string description content
     */
    public $description;
    /**
     * @var PDO|null connexion of database
     */
    private $connexion;

    /**
     * Accueil constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read description content of accueil
     * @return string
     */
    public function lire()
    {
        $sql = "SELECT * 
                FROM a_accueil 
                WHERE ID_Accueil=1";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $row = $query->fetch(PDO::FETCH_ASSOC);
        $this->description = $row['Description'];
        return $this->description;
    }

    /**
     * Create description content of accueil
     * @return bool
     */
    public function creer()
    {
        $sql = "INSERT INTO a_accueil 
                SET Description=:description";
        $query = $this->connexion->prepare($sql);

        $this->description = htmlspecialchars(strip_tags($this->description));
        $query->bindParam(":description", $this->description);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Update description of accueil
     * @return bool
     */
    public function modifier()
    {
        $sql = "UPDATE a_accueil 
                SET Description =:description 
                WHERE ID_Accueil = 1";
        $query = $this->connexion->prepare($sql);

        $this->description = htmlspecialchars(strip_tags($this->description));
        $query->bindParam(":description", $this->description);

        if ($query->execute()) {
            return true;
        }
        return false;
    }
}