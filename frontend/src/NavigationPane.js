import React from 'react';
import axios from 'axios';
import './NavigationPane.css';

export default class NavigationPane extends React.Component {
    constructor(props) {
        super(props);
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
                    {
                        this.props.data.map( d =>
                            <li className="nav-item border-bottom border-secondary" key={d.id} onClick={(e) => this.getNote(e, d.id)}>
                                <button className="nav-link" href="#">{d.id}</button>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}