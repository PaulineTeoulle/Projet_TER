<?php

/**
 * Controller to create Tree
 * @Goal : Fill database with MATUI data
 * @UsedByModule : printNodes() in Tree.js (/src/view/Tree.js)
 * @ModuleUsed : Database.php, Critere.php, Decision.php, Entree.php, Methode.php, MethodeRessource.php, Sortie.php
 * @VisibleVariables : Message, Error
 * @VisibleProcedures : None
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once '../config/Database.php';
    include_once '../models/Critere.php';
    include_once '../models/Decision.php';
    include_once '../models/Entree.php';
    include_once '../models/Methode.php';
    include_once '../models/MethodeRessource.php';
    include_once '../models/Sortie.php';


    $database = new Database();
    $db = $database->getConnection();

    $critere = new Critere($db);
    $decision = new Decision($db);
    $methode = new Methode($db);
    $entree = new Entree($db);
    $sortie = new Sortie($db);
    $methodeRessource = new MethodeRessource($db);

    $critere->delete();
    $decision->delete();
    $methode->delete();
    $entree->delete();
    $sortie->delete();
    $methodeRessource->delete();

    $donnees = json_decode(file_get_contents("php://input"), true);

    foreach ($donnees['criteres'] as $i) {
        if (!empty($i['ID_Critere']) && !empty($i['Libelle']) && !empty($i['x']) && !empty($i['y'])) {
            $critere->id = $i['ID_Critere'];
            $critere->libelle = $i['Libelle'];
            $critere->informations = $i['Informations'];
            $critere->x = $i['x'];
            $critere->y = $i['y'];
            if ($critere->informations == null) {
                if ($critere->createWithoutInformations()) {
                    echo json_encode(["Message" => "Success CRITERE"]);
                } else {
                    echo json_encode(["Error" => "Failure CRITERE"]);
                }

            } else {
                if ($critere->createWithInformations()) {
                    echo json_encode(["Message" => "Success CRITERE"]);
                } else {
                    echo json_encode(["Error" => "Failure CRITERE"]);
                }
            }
        }
    }

    foreach ($donnees['decisions'] as $i) {
        if (!empty($i['ID_Decision']) && !empty($i['Libelle']) && !empty($i['ID_Critere_entrant'])) {
            $decision->id = $i['ID_Decision'];
            $decision->libelle = $i['Libelle'];
            $decision->id_critere_entrant = $i['ID_Critere_entrant'];
            $decision->id_critere_sortant = $i['ID_Critere_sortant'];
            if ($decision->id_critere_sortant == "S0" || $decision->id_critere_sortant == null) {
                if ($decision->createWithoutCritereSortant()) {
                    echo json_encode(["Message" => "Success DECISION"]);
                } else {
                    echo json_encode(["Error" => "Failure DECISION"]);
                }
            } else {
                if ($decision->createWithCritereSortant()) {
                    echo json_encode(["Message" => "Success DECISION"]);
                } else {
                    echo json_encode(["Error" => "Failure DECISION"]);
                }
            }
        }
    }

    foreach ($donnees['methodes'] as $i) {
        $methode->id = $i['ID_Methode'];
        $methode->libelle = $i['Libelle'];
        $methode->description = $i['Description'];
        $methode->effectif_preconise = $i['Effectif_preconise'];
        $methode->donnees_produites = $i['Donnees_produites'];
        $methode->type_analyse = $i['Type_analyse'];
        $methode->type_methode = $i['Type_methode'];
        $methode->exemple = $i['Exemple'];
        $methode->id_decision = $i['ID_Decision'];
        $methode->x = $i['x'];
        $methode->y = $i['y'];
        if ($methode->create()) {
            echo json_encode(["Message" => "Success METHODE"]);
        } else {
            echo json_encode(["Error" => "Failure METHODE"]);
        }
    }

    foreach ($donnees['methodesRessources'] as $i) {
        $methodeRessource->id_methode = $i['ID_Methode'];
        $methodeRessource->id_ressource = $i['ID_Ressource'];
        if ($methodeRessource->create()) {
            echo json_encode(["Message" => "Success METHODE RESSOURCE"]);
        } else {
            echo json_encode(["Error" => "Failure METHODE RESSOURCE"]);
        }
    }

    if (!empty($donnees['entree'][0])) {
        $entree->id = $donnees['entree'][0]['ID_Entree'];
        $entree->critere = $donnees['entree'][0]['ID_Critere'];
        $entree->date = date("Y-m-d");
        $entree->x = $donnees['entree'][0]['x'];
        $entree->y = $donnees['entree'][0]['y'];
        if ($entree->create()) {
            echo json_encode(["Message" => "Success ENTREE"]);
        } else {
            echo json_encode(["Error" => "Failure ENTREE"]);
        }
    }

    if (!empty($donnees['sortie'][0])) {
        $sortie->id = $donnees['sortie'][0]['ID_Sortie'];
        $sortie->message = $donnees['sortie'][0]['message'];
        $sortie->id_decision = $sortie->readIdDecisionSortant();
        $sortie->id_decision = $sortie->id_decision[0]['ID_Decision'];
        $sortie->x = $donnees['sortie'][0]['x'];
        $sortie->y = $donnees['sortie'][0]['y'];
        if ($sortie->create()) {
            echo json_encode(["Message" => "Success SORTIE"]);
        } else {
            echo json_encode(["Error" => "Failure SORTIE"]);
        }
    }
}else {
    http_response_code(405);
    echo json_encode(["Message" => "Unauthorised method"]);
}