import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            file: null,
            datas: [],
            id_methode: "",
            staticLink: 'http://localhost/reactTest/MATUI/src/public/documentsRessources/ExamenIHM_CorentinRoy.pdf'
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault()
        let res = await this.uploadFile(this.state.file);
        console.log(res.data);
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    handleChange(event) {
        this.setState({id_methode: event.target.value});
        console.log(this.state.id_methode);
    }

    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.id_methode);

        this.getDatasForOneMethod();
        event.preventDefault();
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file)
        return await axios.post('http://localhost/reactTest/MATUI/API/Controllers/uploadFile.php', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    open = () => {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        let dynamicPdf = 'ExamenIHM_CorentinRoy.pdf';
        window.open(url + '/Projet_TER/src/public/documentsRessources/' + dynamicPdf);
    }


    getDatasForOneMethod() {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        const json = JSON.stringify({id_methode: Number(this.state.id_methode)});
        console.log(json);
        axios.post(url + '/Projet_TER/API/Controllers/ressource/lireRessourcesMethode.php', json)
            .then(response => {
                this.setState({datas: response.data}, function () {
                    console.log(this.state.datas);
                });
            })
            .catch(error => console.log(error))


    }

    render() {
        if (this.state.datas.length !== 0) {
            return (<div>
                    <form onSubmit={this.onSubmit}>
                        <h1>Upload File</h1>
                        <input type="file" onChange={this.onChange}/>
                        <button type="submit">Upload File</button>
                    </form>

                    <br/>
                    <h1>Read File</h1>
                    <a href={this.state.staticLink}>open pdf (statick link)</a>
                    <br/>
                    <p onClick={this.open}>open pdf (function dynamic link)</p>
                    <br/><br/><br/>
                    <div><h1>Change Methode id</h1>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Id :
                                <input type="text" onChange={this.handleChange}/>
                            </label>
                            <button type="submit">LOL</button>
                        </form>

                        <br/>

                        <div> {this.state.datas.map(data => <p key={data.ID_Ressource}>{data.Nom}</p>)}</div>
                    </div>
                </div>
            )
        } else return (<div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Id :
                    <input type="text" onChange={this.handleChange}/>
                </label>
                <button type="submit">LOL</button>
            </form>
        </div>);
    }
}

export default FileUpload;