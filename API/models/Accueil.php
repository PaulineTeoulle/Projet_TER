<?php

/**
 * Class Accueil
 * @Goal : Read acceuil, Create acceuil, Update accueil description
 * @UsedByModule : Controllers/accueil, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id, $description
 * @VisibleProcedures : read(), create(), updateDescription()
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
     * @var PDO|null connexion to database
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
    public function read()
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
    public function create()
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
    public function updateDescription()
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