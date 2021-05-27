import Loader from "../components/Loader";
import logo from "../public/logothedre.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import ModalEditHome from "../components/modal/ModalEditHome";
import React, {useContext, useEffect, useState} from "react";
import Auth from "../contexts/Auth";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function Home() {
    const [description, setDescription] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newDescription, setNewDescription] = useState(null);
    const {isAdmin, isSuperAdmin} = useContext(Auth);
    const history = useHistory();

    function getHomeContent() {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        if (description === null) {
            axios.get(url + '/Projet_TER/API/Controllers/accueil/lire.php')
            // axios.get(url + '/API/Controllers/accueil/lire.php')
                .then(response => {
                    setDescription(response.data['description']);
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        getHomeContent();
    });


    function handleOpen() {
        setModalOpen(true);
    }

    function handleClose() {
        setModalOpen(false);
    }

    function handleChange(description) {
        setNewDescription(description);
    }

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


    const redirect = () => {
        history.push('/quiz')
    }

    if (description === null) return (<Loader/>);
    else return (
        <div className="Home">
            <div className="logo">
                <img src={logo} alt={'Logo Thedre'}/>
                <button className="button filled" onClick={redirect}>Start</button>
            </div>
            <div className="content">
                <div className="title">
                    <h3>Contents</h3>
                    {/*<FontAwesomeIcon className="icon" icon={faPen} onClick={handleOpen}/>*/}
                    {isAdmin  && ( <FontAwesomeIcon className="icon" icon={faPen} onClick={handleOpen}/>)}
                    {isSuperAdmin && ( <FontAwesomeIcon className="icon" icon={faPen} onClick={handleOpen}/>)}
                </div>

                <p>{description}</p>
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
        </div>
    );
}export default Home;