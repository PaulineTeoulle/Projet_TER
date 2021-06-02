<?php

/**
 * Class Decision
 * @Goal : Read, Create, Delete Decision
 * @UsedByModule : Controllers/decision, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id, $libelle, $id_critere_entrant, $id_critere_sortant, $x, $y
 * @VisibleProcedures : lire(), creerAvecCritereSortant(), creerSansCritereSortant(), supprimer()
 */
class Decision
{
    /**
     * @var int id of decision
     */
    public $id;
    /**
     * @var string libelle
     */
    public $libelle;
    /**
     * @var int id of critere entrant
     */
    public $id_critere_entrant;
    /**
     * @var int id of critere sortant
     */
    public $id_critere_sortant;
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
     * Decision constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all decision
     * @return array
     */
    public function lire()
    {
        $sql = "SELECT * 
                FROM a_decision";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Create decision with critere sortant
     * @return bool
     */
    public function creerAvecCritereSortant()
    {

        $sql = "INSERT INTO a_decision 
                SET ID_Decision =:id_decision, Libelle=:libelle, ID_Critere_entrant=:id_critere_entrant, ID_Critere_sortant=:id_critere_sortant, x=:x, y=:y";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->id_critere_entrant = htmlspecialchars(strip_tags($this->id_critere_entrant));
        $this->id_critere_sortant = htmlspecialchars(strip_tags($this->id_critere_sortant));
        $this->x = htmlspecialchars(strip_tags($this->x));
        $this->y = htmlspecialchars(strip_tags($this->y));

        $query->bindParam(":id_decision", $this->id);
        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":id_critere_entrant", $this->id_critere_entrant);
        $query->bindParam(":id_critere_sortant", $this->id_critere_sortant);
        $query->bindParam(":x", $this->x);
        $query->bindParam(":y", $this->y);


        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Create decision without critere sortant
     * @return bool
     */
    public function creerSansCritereSortant()
    {
        $sql = "INSERT INTO a_decision 
                SET ID_Decision =:id_decision, Libelle=:libelle, ID_Critere_entrant=:id_critere_entrant, x=:x, y=:y";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->id_critere_entrant = htmlspecialchars(strip_tags($this->id_critere_entrant));
        $this->x = htmlspecialchars(strip_tags($this->x));
        $this->y = htmlspecialchars(strip_tags($this->y));

        $query->bindParam(":id_decision", $this->id);
        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":id_critere_entrant", $this->id_critere_entrant);
        $query->bindParam(":x", $this->x);
        $query->bindParam(":y", $this->y);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Delete all decision
     * @return bool
     */
    public function supprimer()
    {
        $sql = " DELETE FROM a_decision";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }
}