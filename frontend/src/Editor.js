import React from 'react';
import {Editor, EditorState, convertFromRaw, convertToRaw, RichUtils} from 'draft-js';
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
    this.setInlineStyle = this.setInlineStyle.bind(this);
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

  setInlineStyle = (e, style) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
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
      <div className="px-4 flex-grow-1 d-flex flex-column">
        <div className="row border-bottom border-secondary">
          <div className="col flex-shrink-0">
            <button type="button" className="btn" onMouseDown={(e) => this.setInlineStyle(e, 'BOLD')} data-toggle="tooltip" data-placement="bottom" title="Pogrubienie">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-type-bold" viewBox="0 0 16 16">
                <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
              </svg> 
            </button>
            <button type="button" className="btn" onMouseDown={(e) => this.setInlineStyle(e, 'ITALIC')} data-toggle="tooltip" data-placement="bottom" title="Kursywa">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-type-italic" viewBox="0 0 16 16">
                <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
              </svg>
            </button>
          </div>
          <div className="col flex-shrink-0 text-right">
            <button type="button" className="btn" onClick={(e) => this.delNote(e, this.props.id)} data-toggle="tooltip" data-placement="bottom" title="Usuń notatkę">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>  
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col flex-grow-1 pt-2" key={this.props.id} data-key={this.props.id} onClick={this.focus}>
            <Editor editorState={this.state.editorState} onChange={this.onChange} ref={this.setDomEditorRef} /> 
          </div>
        </div>
      </div>
    );
  }
}