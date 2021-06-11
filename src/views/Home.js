import Loader from "../components/Loader";
import logo from "../public/logothedre.png";
import demo from "../public/HomeDemo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import ModalEditHome from "../components/modal/ModalEditHome";
import React, {useContext, useEffect, useState} from "react";
import Auth from "../contexts/Auth";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from 'jquery';


/**
 * @Goal : Render home, open modal to edit description, call to api to edit
 * @UsedByModule : App.js
 * @ModuleUsed : Loader, ModalEditHome
 * @VisibleVariables :
 * @VisibleProcedures :
 * @returns {JSX.Element}
 */
function Home() {
    /**
     * Setup state for role, description, newDescription, modalOpen
     */
    const [description, setDescription] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newDescription, setNewDescription] = useState(null);
    const {userRole, setUserRole} = useContext(Auth);
    const history = useHistory();

    /**
     * Call API to update description
     */
    function getHomeContent() {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        if (description === null) {
            axios.get(url + '/Projet_TER/API/Controllers/accueil/lire.php')
                .then(response => {
                    setDescription(response.data['description']);
                })
                .catch(error => console.log(error))
        }
    }

    /**
     * Effect before render
     */
    useEffect(() => {
        getHomeContent();
    });

    /**
     * Set boolean modalOpen to true
     */
    function handleOpen() {
        setModalOpen(true);
    }

    /**
     * Set boolean modalOpen to false
     */
    function handleClose() {
        setModalOpen(false);
    }

    /**
     * Update newDescription with param description
     * @param description the new description
     */
    function handleChange(description) {
        setNewDescription(description);
    }

    /**
     * Call to API to edit description
     */
    function edit() {
        if (newDescription !== null) {
            let data = JSON.stringify({description: newDescription});
            let protocol = window.location.protocol;
            let host = window.location.hostname;
            let url = protocol + '//' + host;
            axios.put(url +'/Projet_TER/API/Controllers/accueil/modifier.php',data)
                .then(() => {
                    axios.get(url+ '/Projet_TER/API/Controllers/accueil/lire.php')
                        .then(response => {
                            setDescription(response.data['description']);
                        })
                        .catch(error => console.log(error))
                    handleClose();
                })
                .catch(function (erreur) {
                    console.log(erreur);
                });
        }
        handleClose();
    }

    /**
     * Redirect to quiz component
     */
    const redirect = () => {
        history.push('/quiz')
    }

    /**
     * Return Loader if description is not set
     */
    if (description === null) return (<Loader/>);
    /**
     * Return content if description is set, contains ModalEditHome
     */
    else return (
        <div className="Home">
            <div>
                <div>
                <h1><strong>MATUI</strong>'s tree in digital version</h1>
                    <div className="content">
                        <div>
                            <h3><strong>What is it ?</strong></h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            <button className="button filled" onClick={redirect}>Start now</button>
                        </div>
                        <div>
                            <img src={demo} alt={'Tool demo'}/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3>More explications
                    {userRole==="super-admin"  && ( <FontAwesomeIcon className="icon" icon={faPen} onClick={handleOpen}/>)}
                    {userRole==="administrator" && ( <FontAwesomeIcon className="icon" icon={faPen} onClick={handleOpen}/>)}
                </h3>
        
                <div className="content">
                    <div className="logo">
                        <img src={logo} alt={'Logo Thedre'}/>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
            <ModalEditHome
                    title="Modify description"
                    message="Please modify"
                    oldDescription={description}
                    actionButton="Confirm"
                    closeButton="Quit"
                    open={modalOpen}
                    close={handleClose}
                    mainAction={edit}
                    changeAction={handleChange}
                />
        </div>
    );
}
export default Home;