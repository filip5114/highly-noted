import axios from 'axios';
import { convertToRaw, EditorState } from 'draft-js';
import React from 'react';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
    }

    addNote = (e) => {
        e.preventDefault();

        const data = {
            'content': JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
        };

        axios.post(`http://localhost:5000/api/v1/note/add`, data)
            .then(res => {
                this.props.updateState('data', res.data.notes);
                this.props.updateState('currentNote', res.data.new_note);
            })
            .catch(error => {
                console.log(error);
            });

    }

    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar border-bottom border-secondary">
                <div className="container-fluid">
                    <button className="navbar-brand" href="#">Highly Noted</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <button className="nav-link" href="#" onClick={this.addNote} data-toggle="tooltip" data-placement="bottom" title="Nowa notatka">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                        {/* <button className="nav-link" href="#">Features</button> */}
                        {/* <button className="nav-link" href="#">Pricing</button> */}
                    </div>
                    </div>
                </div>
            </nav>
        )
    }
}