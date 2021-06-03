<?php

/**
 * Class Sortie
 * @Goal : Read, Create, Delete sortie
 * @UsedByModule : Controllers/sortie, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id,$message,$id_decision
 * @VisibleProcedures : lire(), creer(), supprimer()
 **/
class Sortie
{
    /**
     * @var int id of sortie
     */
    public $id;
    /**
     * @var string message of sortie
     */
    public $message;
    /**
     * @var int id of decision
     */
    public $id_decision;
    /**
     * @var int position x
     */
    public $x;
    /**
     * @var int position y
     */
    public $y;
    /**
     * @var PDO|null connexion to database
     */
    private $connexion;

    /**
     * Sortie constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all sortie
     * @return array
     */
    public function lire()
    {
        $sql = "SELECT * 
                FROM a_sortie";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function  lireDecisionSortant(){
        $sql = "SELECT ID_Decision
                FROM a_decision WHERE ID_Critere_sortant is null ";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    /**
     * Create sortie
     * @return bool
     */
    public function creer()
    {
        $sql = "INSERT INTO a_sortie 
                SET ID_Sortie=:id_sortie, Message=:message, ID_Decision =:id_decision, x=:x, y=:y";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->message = htmlspecialchars(strip_tags($this->message));
        $this->id_decision = htmlspecialchars(strip_tags($this->id_decision));
        $this->x = htmlspecialchars(strip_tags($this->x));
        $this->y = htmlspecialchars(strip_tags($this->y));

        $query->bindParam(":id_sortie", $this->id);
        $query->bindParam(":message", $this->message);
        $query->bindParam(":id_decision", $this->id_decision);
        $query->bindParam(":x", $this->x);
        $query->bindParam(":y", $this->y);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Delete all sortie
     * @return bool
     */
    public function supprimer()
    {
        $sql = " DELETE FROM a_sortie";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }
}