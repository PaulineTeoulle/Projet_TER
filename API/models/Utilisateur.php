<?php

/**
 * Class Utilisateur
 * @Goal : Read user, Create user, Delete users, Update Role of user
 * @UsedByModule : Controllers/utilisateur
 * @ModuleUsed : None
 * @VisibleVariables : $id,$mail,$pseudo, $mot_de_passe, $role
 * @VisibleProcedures : lire(), compterMail(), compterPseudo(), lireUn(), lireMotDePasse(), creer(), supprimer(), modifierRole()
 */
class Utilisateur
{
    /**
     * @var int id of user
     */
    public $id;
    /**
     * @var string mail
     */
    public $mail;
    /**
     * @var string username
     */
    public $pseudo;
    /**
     * @var string password
     */
    public $mot_de_passe;
    /**
     * @var string role
     */
    public $role = "user";
    /**
     * @var PDO|null connexion to database
     */
    private $connexion;

    /**
     * Utilisateur constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * Read all users
     * @return mixed
     */
    public function lire()
    {
        $sql = "SELECT ID_Utilisateur, Mail, Pseudo, Role 
                FROM u_utilisateur";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Count number of specific mail
     * @return mixed
     */
    public function compterMail(){
        $sql = "SELECT COUNT(*)
                FROM u_utilisateur 
                WHERE Mail= :mail";
        $query = $this->connexion->prepare($sql);

        $this->mail = htmlspecialchars(strip_tags($this->mail));
        $query->bindParam(":mail", $this->mail);

        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Count number of specific pseudo
     * @return mixed
     */
    public function compterPseudo(){
        $sql = "SELECT COUNT(*)
                FROM u_utilisateur 
                WHERE Pseudo= :pseudo";
        $query = $this->connexion->prepare($sql);

        $this->pseudo = htmlspecialchars(strip_tags($this->pseudo));
        $query->bindParam(":pseudo", $this->pseudo);

        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result;
    }


    /**
     * Read one user
     * @return mixed
     */
    public function lireUn()
    {
        $sql = "SELECT ID_Utilisateur, Mail, Pseudo, Role, Mot_de_passe 
                FROM u_utilisateur 
                WHERE Pseudo= :pseudo";
        $query = $this->connexion->prepare($sql);

        $this->pseudo = htmlspecialchars(strip_tags($this->pseudo));
        $query->bindParam(":pseudo", $this->pseudo);

        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Read hashed password
     * @return mixed
     */
    public function lireMotDePasse(){
        $sql = "SELECT Mot_de_passe 
                FROM u_utilisateur 
                WHERE Pseudo=:pseudo";
        $query = $this->connexion->prepare($sql);

        $this->pseudo = htmlspecialchars(strip_tags($this->pseudo));
        $query->bindParam(":pseudo", $this->pseudo);

        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Create user
     * @return bool
     */
    public function creer()
    {
        $sql = "INSERT INTO u_utilisateur 
                SET Mail=:mail, Pseudo=:pseudo,  Mot_de_passe=:mot_de_passe, Role=:role ";
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

    /**
     * Delete specific user
     * @return bool
     */
    public function supprimer()
    {
        $sql = "DELETE FROM u_utilisateur 
                WHERE ID_Utilisateur=:id_utilisateur ";
        $query = $this->connexion->prepare($sql);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $query->bindParam(":id_utilisateur", $this->id);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Update role of specific user
     * @return bool
     */
    public function modifierRole()
    {
        $sql = "UPDATE u_utilisateur 
                SET Role =:role 
                WHERE ID_Utilisateur = :id_utilisateur";
        $query = $this->connexion->prepare($sql);

        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $query->bindParam(":role", $this->role);
        $query->bindParam(":id_utilisateur", $this->id);

        if ($query->execute()) {
            return true;
        }
        return false;
    }

}