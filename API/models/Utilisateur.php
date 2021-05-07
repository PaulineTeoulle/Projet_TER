<?php

class Utilisateur
{
    public $id;
    public $mail;
    public $pseudo;
    public $mot_de_passe;
    public $role = "utilisateur";
    private $connexion;
    private $table = "u_utilisateur";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * FROM u_utilisateur";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        // On retourne le résultat
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }


    public function creer()
    {
        echo $this->pseudo;
        echo $this->mail;
        echo $this->mot_de_passe;
        $sql = "INSERT INTO u_utilisateur SET Mail=:mail, Pseudo=:pseudo,  Mot_de_passe=:mot_de_passe, Role=:role ";
        $query = $this->connexion->prepare($sql);

        $this->mail = htmlspecialchars(strip_tags($this->mail));
        $this->pseudo = htmlspecialchars(strip_tags($this->pseudo));
        $this->mot_de_passe = htmlspecialchars(strip_tags($this->mot_de_passe));

        $query->bindParam(":mail", $this->mail);
        $query->bindParam(":pseudo", $this->pseudo);
        $query->bindParam(":mot_de_passe", $this->mot_de_passe);
        $query->bindParam(":role", $this->role);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

}