import axios from 'axios';
import React from 'react';
// import ReactMarkdown from 'react-markdown';
import EditableText from './EditableText';

// import EditableText from './EditableText';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }

        this.delNote = this.delNote.bind(this);
        this.addNote = this.addNote.bind(this);
    };

    componentDidMount = () => {
        axios.get('http://localhost:5000/api')
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    delNote = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/v1/note/delete`, {id: e.target.parentNode.dataset.key})
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    addNote = (e) => {
        e.preventDefault();

        const data = {
            'title': 'default',
            'value': 'Edit text here...'
        };
        axios.post(`http://localhost:5000/api/v1/note/add`, data)
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        
        return (
            <div className="row">
                <div className="col">
                    { this.state.data.map(d => 
                        <div className="m-2 p-2 border bg-light" key={d.id} data-key={d.id}>
                            <h2 onClick={(e) => this.delNote(e)}>{d.title}</h2>
                            <EditableText text={d.text} id={d.id}/>
                        </div>
                    )}
                </div>
                <div className="col-4">
                    <ul className="list-group">
                        <button type="button" className="list-group-item" onClick={this.addNote}>Add note</button>
                    </ul>
                </div>
            </div>
        )
    }
} 