<?php

/**
 * Class Methode
 * @Goal : Read methode, Create methode, Delete methode
 * @UsedByModule : Controllers/methode, creerArbre, lireArbre
 * @ModuleUsed : None
 * @VisibleVariables : $id,$libelle,$description,$effectif_preconise,$donnees_produites,$type_analyse,$type_methode,$exemple,$id_decision,$x,$y
 * @VisibleProcedures : read(), create(), delete()
 */
class Methode
{
    /**
     * @var int id of methode
     */
    public $id;
    /**
     * @var string libelle
     */
    public $libelle;
    /**
     * @var string description
     */
    public $description;
    /**
     * @var string number of people recommended
     */
    public $effectif_preconise;
    /**
     * @var string data produced
     */
    public $donnees_produites;
    /**
     * @var string type of analysis
     */
    public $type_analyse;
    /**
     * @var string type of methode
     */
    public $type_methode;
    /**
     * @var string example
     */
    public $exemple;
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
     * Methode constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all methode
     * @return array
     */
    public function read()
    {
        $sql = "SELECT * 
                FROM a_methode";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create methode
     * @return bool
     */
    public function create()
    {
        $sql = "INSERT INTO a_methode
                SET ID_Methode=:id_methode, Libelle=:libelle, Description=:description, Effectif_preconise=:effectif_preconise, Donnees_produites=:donnees_produites, Type_analyse=:type_analyse,
                Type_methode=:type_methode,Exemple=:exemple, ID_Decision=:id_decision, x=:x, y=:y";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->libelle = htmlspecialchars(strip_tags($this->libelle));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->effectif_preconise = htmlspecialchars(strip_tags($this->effectif_preconise));
        $this->donnees_produites = htmlspecialchars(strip_tags($this->donnees_produites));
        $this->type_analyse = htmlspecialchars(strip_tags($this->type_analyse));
        $this->type_methode = htmlspecialchars(strip_tags($this->type_methode));
        $this->exemple = htmlspecialchars(strip_tags($this->exemple));
        $this->id_decision = htmlspecialchars(strip_tags($this->id_decision));
        $this->x = htmlspecialchars(strip_tags($this->x));
        $this->y = htmlspecialchars(strip_tags($this->y));

        $query->bindParam(":id_methode", $this->id);
        $query->bindParam(":libelle", $this->libelle);
        $query->bindParam(":description", $this->description);
        $query->bindParam(":effectif_preconise", $this->effectif_preconise);
        $query->bindParam(":donnees_produites", $this->donnees_produites);
        $query->bindParam(":type_analyse", $this->type_analyse);
        $query->bindParam(":type_methode", $this->type_methode);
        $query->bindParam(":exemple", $this->exemple);
        $query->bindParam(":id_decision", $this->id_decision);
        $query->bindParam(":x", $this->x);
        $query->bindParam(":y", $this->y);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Delete all methode
     * @return bool
     */
    public function delete()
    {
        $sql = " DELETE FROM a_methode ";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

}