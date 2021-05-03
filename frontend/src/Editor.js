import React from 'react';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import axios from 'axios';
import debounce from 'loadsh/debounce';
import 'draft-js/dist/Draft.css';
import './Editor.css';

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)))
    };
    this.onChange = this.onChange.bind(this);
    this.setDomEditorRef = ref => this.domEditor = ref;
    this.focus = () => this.domEditor.focus();
    this.delNote = this.delNote.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  delNote = (e, id) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/api/v1/note/delete`, {id: id})
        .then(res => {
            this.props.updateState('data', res.data);
            this.props.updateState('currentNote', null);
        })
        .catch(error => {
            console.log(error);
        });
  }

  onChange = (editorState) => {
    this.setState({editorState});
    this.saveContent();
  }

  saveContent = debounce(() => {
    const data = {
      'id': this.props.id,
      'content': JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    };

    axios.post(`http://localhost:5000/api/v1/note/edit`, data)
      .then(res => {
          console.log(res);
      })
      .catch(error => {
          console.log(error);
      });
  }, 1000)

  render() {
    return (
      <div className="p-2 flex-grow-1 d-flex flex-column">
        <div className="flex-shrink-0 border-bottom">
          <button type="button" className="btn" onClick={(e) => this.delNote(e, this.props.id)} data-toggle="tooltip" data-placement="bottom" title="Usuń notatkę">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>  
          </button>
        </div>
        <div className="flex-grow-1 pt-2" key={this.props.id} data-key={this.props.id} onClick={this.focus}>
          <Editor editorState={this.state.editorState} onChange={this.onChange} ref={this.setDomEditorRef} /> 
        </div>
      </div>
    );
  }
}