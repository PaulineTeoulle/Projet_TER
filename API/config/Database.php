<?php

/**
 * Class Database
 * @Goal : Connect to database
 * @UsedByModule : Controllers (all)
 * @ModuleUsed : None
 * @VisibleVariables : $connexion
 * @VisibleProcedures : getConnection()
 */
class Database
{
    /**
     * @var null connexion of database
     */
    public $connexion;
    /**
     * @var string host of database
     */
    private $host = "localhost";
    /**
     * @var string database name
     */
    private $db_name = "api_matui";
    /**
     * @var string database user
     */
    private $username = "root"; //"adminMatui";
    /**
     * @var string database password
     */
    private $password = ""; //"Pm2Mv1MDRT!";


    /**
     * Connect to database with PDO
     * @return PDO|null
     */
    public function getConnection()
    {
        $this->connexion = null;
        try {
            $this->connexion = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->connexion->exec('set names utf8');
        } catch (Exception $exception) {
            echo "Erreur de connexion à la BDD : " . $exception->getMessage();
        }
        return $this->connexion;
    }
}