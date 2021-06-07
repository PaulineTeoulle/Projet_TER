<?php

/**
 * Class Entree
 * @Goal : Read entree, Create entree, Delete entree
 * @UsedByModule : Controllers/entree, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id, $date, $critere, $x, $y
 * @VisibleProcedures : read(), create(), delete()
 */
class Entree
{
    /**
     * @var int id of entree
     */
    public $id;
    /**
     * @var string date of save
     */
    public $date;
    /**
     * @var int id of critere
     */
    public $critere;
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
     * Entree constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all entree
     * @return array
     */
    public function read()
    {
        $sql = "SELECT * 
                FROM a_entree";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create entree
     * @return bool
     */
    public function create()
    {
        $sql = "INSERT INTO a_entree 
                SET ID_Entree =:id, Date=:date, ID_Critere =:id_critere, x =:x, y=:y";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->critere = htmlspecialchars(strip_tags($this->critere));
        $this->x = htmlspecialchars(strip_tags($this->x));
        $this->y = htmlspecialchars(strip_tags($this->y));

        $query->bindParam(":id", $this->id);
        $query->bindParam(":date", $this->date);
        $query->bindParam(":id_critere", $this->critere);
        $query->bindParam(":x", $this->x);
        $query->bindParam(":y", $this->y);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Delete all entree
     * @return bool
     */
    public function delete(){
        $sql = "DELETE FROM a_entree";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }
}