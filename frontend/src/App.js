import axios from 'axios';
import React from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import MyEditor from './Editor';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }

        this.delNote = this.delNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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

    delNote = (e, id) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/v1/note/delete`, {id: id})
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
            'content': JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
        };
        axios.post(`http://localhost:5000/api/v1/note/add`, data)
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log(error);
            });

    }

    handleBlur = (id, current_context) => {
        const data = {
          'id': id,
          'content': JSON.stringify(convertToRaw(current_context))
        };
        console.log(data.id);
    
        axios.post(`http://localhost:5000/api/v1/note/edit`, data)
          .then(res => {
              console.log(res);
          })
          .catch(error => {
              console.log(error);
          });
      }

    render() {
        return (
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-4">
                    { this.state.data.map(d => 
                        <MyEditor id={d.id} content={d.content} key={d.id} data-key={d.id} delete={this.delNote} blur={this.handleBlur} />)
                    }
                </div>
                <div className="col-2 bg-dark vh-100">
                    <ul className="list-group p-2">
                        <button type="button" className="list-group-item" onClick={this.addNote}>Add note</button>
                    </ul>
                </div>
            </div>
        )
    }
} 