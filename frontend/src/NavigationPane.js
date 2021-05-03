import React from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import axios from 'axios';
import './NavigationPane.css';

export default class NavigationPane extends React.Component {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        this.getNote = this.getNote.bind(this);
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api')
            .then(res => {
                this.props.updateState('data', res.data);
            })
            .catch(error => {
                console.log(error);
            });
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

    getNote = (e, id) => {
        e.preventDefault();

        axios.get('http://localhost:5000/api/v1/note/get', {
            params: {
                id: id
            }
        })
        .then(res => {
            this.props.updateState('currentNote', res.data);
        })
        .catch(error => {
            console.log(error);
        });

    }

    render () {
        return (
            <div id="pane" className="w-100">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <button className="nav-link" aria-current="page" href="#" onClick={this.addNote}>New Note</button>
                    </li>
                </ul>
                <ul className="nav flex-column">
                    {
                        this.props.data.map( d =>
                            <li className="nav-item" key={d.id}>
                                <button className="nav-link" href="#" onClick={(e) => this.getNote(e, d.id)}>{d.id}</button>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}