import React from 'react';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import axios from 'axios';
import debounce from 'loadsh/debounce';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import './Editor.css';

import bold from './icons/type-bold.svg';
import italic from './icons/type-italic.svg';
import strikethrough from './icons/type-strikethrough.svg';
import underline from './icons/type-underline.svg';
import braces from './icons/braces.svg';
import list_ol from './icons/list-ol.svg';
import list_ul from './icons/list-ul.svg';
import text_indent_left from './icons/text-indent-left.svg';
import text_indent_right from './icons/text-indent-right.svg';
import text_center from './icons/text-center.svg';
import text_left from './icons/text-left.svg';
import text_right from './icons/text-right.svg';
import justify from './icons/justify.svg';
import link from './icons/link.svg';
import arrow_clockwise from './icons/arrow-clockwise.svg';
import arrow_counterclockwise from './icons/arrow-counterclockwise.svg';
import image from './icons/image.svg';
import emoji_smile from './icons/emoji-smile.svg';
import palette from './icons/palette.svg';



export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.moveFocusToEnd(EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content))))
    };
    this.onChange = this.onChange.bind(this);
    this.delNote = this.delNote.bind(this);
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
      <div className="container-fluid h-100 d-flex flex-column"> {/* px-4 */}
        <div className="row">
          <div className="col-md-12 text-right">
            <button type="button" className="btn" onClick={(e) => this.delNote(e, this.props.id)} data-toggle="tooltip" data-placement="bottom" title="Usuń notatkę">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>  
            </button>
          </div>
        </div>
        <div className="row flex-grow-1">
          <div className="col-md-12 p-0" key={this.props.id} data-key={this.props.id} onClick={this.focus}>
            <Editor editorState={this.state.editorState} onEditorStateChange={this.onChange} wrapperClassName="wrapper-class container-fluid h-100 d-flex flex-column p-0" editorClassName="editor-class flex-grow-1 p-0 m-0" toolbarClassName="toolbar-class border-bottom border-top border-secondary" toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history', 'remove'],
              inline: { 
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                bold: {icon: bold, className: 'custom-button'},
                italic: {icon: italic, className: 'custom-button'},
                underline: {icon: underline, className: 'custom-button'},
                strikethrough: {icon: strikethrough, className: 'custom-button'},
                monospace: {icon: braces, className: 'custom-button'},
                superscript: {className: 'custom-button'},
                subscript: {className: 'custom-button'}
              },
              blockType: {
                className: 'custom-button',
                dropdownClassName: ''
              },
              fontSize: { 
                className: 'custom-button'
              },
              fontFamily: {
                className: 'custom-button',
                dropdownClassName: ''
              },
              list: { 
                unordered: { icon: list_ul, className: 'custom-button' },
                ordered: { icon: list_ol, className: 'custom-button' },
                indent: { icon: text_indent_left, className: 'custom-button' },
                outdent: { icon: text_indent_right, className: 'custom-button' }
              },
              textAlign: { 
                left: { icon: text_left, className: 'custom-button' },
                center: { icon: text_center, className: 'custom-button' },
                right: { icon: text_right, className: 'custom-button' },
                justify: { icon: justify, className: 'custom-button' }
              },
              colorPicker: {
                icon: palette,
                className: 'custom-button',
                popupClassName: ''
              },
              link: { 
                popupClassName: '',
                options: ['link'],
                link: { icon: link, className: 'custom-button' },
                unlink: {className: 'custom-button'}
              },
              embedded: {
                // icon: code,
                className: 'custom-button',
                popupClassName: ''
              },
              emoji: {
                icon: emoji_smile,
                className: 'custom-button',
                popupClassName: ''
              },
              image: {
                icon: image,
                className: 'custom-button',
                popupClassName: '"demo-popup-custom"'
              },
              remove: { 
                options: [],
                className: 'custom-button'
              },
              history: { 
                undo: { icon: arrow_counterclockwise, className: 'custom-button' },
                redo: { icon: arrow_clockwise, className: 'custom-button' } 
              },
            }} /> 
          </div>
        </div>
      </div>
    );
  }
}