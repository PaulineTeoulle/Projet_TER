import React from 'react'
import axios from 'axios';
import pdf from '../public/documentsRessources/Compte-Rendu-de-Réunion-7.pdf';

class FileUpload extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            file: null,
            showFile: '../public/documentsRessources/Compte-Rendu-de-Réunion-7.pdf'
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }

    async onSubmit(e) {
        e.preventDefault()
        let res = await this.uploadFile(this.state.file);
        console.log(res.data);
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file)
        return await axios.post('http://localhost/Projet_TER/API/Controllers/uploadFile.php', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }


    componentDidMount() {
        if (this.state.description === null) {
            axios.get('http://localhost/Projet_TER/API/Controllers/readFile.php')
                .then(response => {

                    this.setState({showFile: response.data['description']});
                })
                .catch(error => console.log(error))
        }
    };

    render() {
        console.log(pdf);
        console.log(this.state.showFile);
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1> React File Upload Example</h1>
                    <input type="file" onChange={this.onChange}/>
                    <button type="submit">Upload File</button>
                    <a href={pdf} target="blank">OUI</a>
                    <a href={require('../public/documentsRessources/Compte-Rendu-de-Réunion-7.pdf')}
                       target="blank">NON</a>
                </form>
            </div>
        )
    }
}

export default FileUpload;