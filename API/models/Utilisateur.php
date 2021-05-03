<?php

class Utilisateur
{
    public $id;
    public $mail;
    public $pseudo;
    public $mot_de_passe;
    public $role;
    private $connexion;
    private $table = "u_utilisateur";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * FROM " . $this->table;
        $query = $this->connexion->prepare($sql);
        $query->execute();
        return $query;
    }
}