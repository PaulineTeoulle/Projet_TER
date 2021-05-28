<?php


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
    include_once '../models/Ressource.php';
    include_once '../models/Sortie.php';


    $database = new Database();
    $db = $database->getConnection();

    $critere = new Critere($db);
    $decision = new Decision($db);
    $methode = new Methode($db);
    $entree = new Entree($db);
    $sortie = new Sortie($db);
    $ressource = new Ressource($db);
    $methodeRessource = new MethodeRessource($db);

    $critere->supprimer();
    $decision->supprimer();
    $methode->supprimer();
    $entree->supprimer();
    $sortie->supprimer();
    $ressource->supprimer();
    $methodeRessource->supprimer();

    $donnees = json_decode(file_get_contents("php://input"), true);

    //Gestion des critères
    foreach ($donnees['criteres'] as $i) {
        if (!empty($i['ID_Critere']) && !empty($i['Libelle']) && !empty($i['x']) && !empty($i['y'])) {
            $critere->id = $i['ID_Critere'];
            $critere->libelle = $i['Libelle'];
            $critere->informations = $i['Informations'];
            $critere->x = $i['x'];
            $critere->y = $i['y'];

            if ($critere->informations == null) {
                if ($critere->creerSansInformations()) {
                    $critereResults = [
                        "id" => $critere->id,
                        "libelle" => $critere->libelle,
                        "informations" => $critere->informations,
                        "x" => $critere->x,
                        "y" => $critere->y
                    ];
                    echo json_encode(["critereResults" => $critereResults]);
                    echo json_encode(["message" => "L'ajout a été effectué"]);
                } else {
                    echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
                }

            } else {
                if ($critere->creerAvecInformations()) {
                    $critereResults = [
                        "id" => $critere->id,
                        "libelle" => $critere->libelle,
                        "informations" => $critere->informations,
                        "x" => $critere->x,
                        "y" => $critere->y
                    ];
                    echo json_encode(["critereResults" => $critereResults]);
                    echo json_encode(["message" => "L'ajout a été effectué"]);
                } else {
                    echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
                }
            }
        }
    }


    //Gestion des décisions
    foreach ($donnees['decisions'] as $i) {

        if (!empty($i['ID_Decision']) && !empty($i['Libelle']) && !empty($i['ID_Critere_entrant']) && !empty($i['x']) && !empty($i['y'])) {
            $decision->id = $i['ID_Decision'];
            $decision->libelle = $i['Libelle'];
            $decision->id_critere_entrant = $i['ID_Critere_entrant'];
            $decision->id_critere_sortant = $i['ID_Critere_sortant'];
            $decision->x = $i['x'];
            $decision->y = $i['y'];
            if ($decision->id_critere_sortant == null) {
                if ($decision->creerSansCritereSortant()) {
                    $decisionResults = [
                        "id" => $decision->id,
                        "libelle" => $decision->libelle,
                        "id_critere_entrant" => $decision->id_critere_entrant,
                        "id_critere_sortant" => $decision->id_critere_sortant,
                        "x" => $decision->x,
                        "y" => $decision->y
                    ];
                    echo json_encode(["decisionResults" => $decisionResults]);
                    echo json_encode(["message" => "L'ajout a été effectué"]);
                } else {
                    echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
                }

            } else {
                if ($decision->creerAvecCritereSortant()) {
                    $decisionResults = [
                        "id" => $decision->id,
                        "libelle" => $decision->libelle,
                        "id_critere_entrant" => $decision->id_critere_entrant,
                        "id_critere_sortant" => $decision->id_critere_sortant,
                        "x" => $decision->x,
                        "y" => $decision->y
                    ];
                    echo json_encode(["decisionResults" => $decisionResults]);
                    echo json_encode(["message" => "L'ajout a été effectué"]);
                } else {
                    echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
                }
            }
        }

    }

    //Gestion des méthodes
    foreach ($donnees['methodes'] as $i) {
        if (!empty($i['ID_Methode']) && !empty($i['Libelle']) && !empty($i['Description']) && !empty($i['Effectif_preconise']) && !empty($i['Donnees_produites']) &&
            !empty($i['Type_analyse']) && !empty($i['Type_methode']) && !empty($i['Exemple']) && !empty($i['ID_Decision']) && !empty($i['x']) && !empty($i['y'])) {

            $methode->id = $i['ID_Methode'];
            $methode->libelle = $i['Libelle'];
            $methode->description = $i['Description'];
            $methode->effectif_preconise = $i['Effectif_preconise'];
            $methode->donnees_produites = $i['Donnees_produites'];
            $methode->type_analyse = $i['Type_analyse'];;
            $methode->type_methode = $i['Type_methode'];
            $methode->exemple = $i['Exemple'];
            $methode->id_decision = $i['ID_Decision'];
            $methode->x = $i['x'];
            $methode->y = $i['y'];

            if ($methode->creer()) {
                $methodeResults = [
                    "id" => $methode->id,
                    "libelle" => $methode->libelle,
                    "description" => $methode->description,
                    "effectif_preconise" => $methode->effectif_preconise,
                    "donnees_produites" => $methode->donnees_produites,
                    "type_analyse" => $methode->type_analyse,
                    "type_methode" => $methode->type_methode,
                    "exemple" => $methode->exemple,
                    "id_decision" => $methode->id_decision
                ];
                echo json_encode(["message" => "Methode ajoutée"]);
            } else {
                echo json_encode(["message" => "Methode non ajoutée"]);
            }
        }
    }

//
//    //Gestion de l'entrée
//    foreach ($donnees['entree'] as $i) {
//        $entree->id = $i['ID_Entree'];
//        $entree->date = $i['Date'];
//        $entree->critere = $i['ID_Critere'];
//
//        if ($entree->creer()) {
//            $entreeResults = [
//                "id"=> $entree->id,
//                "date" => $entree->date,
//                "critere" => $entree->critere
//            ];
//            echo json_encode(["message" => "Entree ajoutée"]);
//        } else {
//            echo json_encode(["message" => "Entree non ajoutée"]);
//        }
//    }
//    //Gestion de la sortie
//    foreach ($donnees['sortie'] as $i) {
//        $sortie->id = $i['ID_Sortie'];
//        $sortie->message = $i['Message'];
//        $sortie->id_decision = $i['ID_Decision'];
//
//        if ($sortie->creer()) {
//            $sortieResults = [
//                "id" => $sortie->id,
//                "message" => $sortie->message,
//                "id_decision" => $sortie->id_decision
//
//            ];
//            echo json_encode(["message" => "Sortie ajoutée"]);
//        } else {
//            echo json_encode(["message" => "Sortie non ajoutée"]);
//        }
//    }

    }
else {
        http_response_code(405);
        echo json_encode(["message" => "La méthode n'est pas autorisée"]);
    }
