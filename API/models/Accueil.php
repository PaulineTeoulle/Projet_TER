<?php

class Accueil
{
    public $id;
    public $description;
    private $connexion;
    private $table = "a_accueil";

    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Lecture de l'accueil
     *
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
        $this->id = $row['ID_Accueil'];
        return $this->description;
    }

    /**
     * Créer l'accueil
     *
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
     * Mettre à jour l'accueil
     *
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