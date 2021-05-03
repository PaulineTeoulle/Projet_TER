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
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE ID_Accueil =1 ";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
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
    public function creer($description)
    {

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO " . $this->table . " SET Description=:description";

        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->description = htmlspecialchars(strip_tags($description));

        // Ajout des données protégées
        $query->bindParam(":description", $this->description);

        // Exécution de la requête
        if ($query->execute()) {
            return true;
        }
        return false;
    }


    /**
     * Supprimer l'accueil
     *
     * @return bool
     */
    public function supprimer()
    {
        // On écrit la requête
        $sql = "DELETE FROM " . $this->table . " WHERE ID_Accueil = 1";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On exécute la requête
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
        // On écrit la requête
        $sql = "UPDATE " . $this->table . "SET Description = :description WHERE id = 1";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On sécurise les données;
        $this->description = htmlspecialchars(strip_tags($this->description));

        // On attache les variables
        $query->bindParam(':description', $this->description);

        // On exécute
        if ($query->execute()) {
            return true;
        }

        return false;
    }
}