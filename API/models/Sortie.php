<?php

class Sortie
{
    public $id;
    public $message;
    public $id_decision;
    public $x;
    public $y;
    private $connexion;
    private $table = "a_sortie";

    public function __construct($db)
    {
        $this->connexion = $db;
    }

    public function lire()
    {
        $sql = "SELECT * 
                FROM a_sortie";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

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

    public function supprimer()
    {
        $sql = " DELETE FROM a_sortie";
        $query = $this->connexion->prepare($sql);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

//    public function modifierSansDecision()
//    {
//        $sql = "UPDATE a_sortie SET Message =:message WHERE ID_Sortie = 1";
//        $query = $this->connexion->prepare($sql);
//
//        $this->message = htmlspecialchars(strip_tags($this->message));
//
//        $query->bindParam(":message", $this->message);
//        if ($query->execute()) {
//            return true;
//        }
//        return false;
//    }
//
//
//    public function modifierAvecDecision()
//    {
//        $sql = "UPDATE a_sortie SET Message =:message, ID_Decision =:id_decision WHERE ID_Sortie = 1";
//        $query = $this->connexion->prepare($sql);
//
//        $this->message = htmlspecialchars(strip_tags($this->message));
//        $this->id_decision = htmlspecialchars(strip_tags($this->id_decision));
//
//        $query->bindParam(":message", $this->message);
//        $query->bindParam(":id_decision", $this->id_decision);
//        if ($query->execute()) {
//            return true;
//        }
//        return false;
//    }

}