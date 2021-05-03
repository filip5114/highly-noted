import React from 'react';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import axios from 'axios';
import 'draft-js/dist/Draft.css';

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)))
    };
    this.onChange = editorState => this.setState({editorState});
    this.setDomEditorRef = ref => this.domEditor = ref;
    this.focus = () => this.domEditor.focus();
    this.delNote = this.delNote.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

  handleBlur = () => {
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
  }

  render() {
    return (
      <div className="p-2 h-100">
        <div className="m-2 p-3 border-top border-bottom bg-light" key={this.props.id} data-key={this.props.id} onClick={this.focus}>
          <Editor editorState={this.state.editorState} onChange={this.onChange} ref={this.setDomEditorRef} onBlur={this.handleBlur}/>
        </div>
        <button className="btn btn-danger btn-block" type="button" onClick={(e) => this.delNote(e, this.props.id)}>Delete note</button>
      </div>
    );
  }
}