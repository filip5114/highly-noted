import React from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
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
  }

  componentDidMount() {
    console.log(`elo: ${this.props.id}`);
  }

  render() {
    return (
      <div className="p-2 border bg-light">
        <div className="m-2 p-3 border bg-light" key={this.props.id} data-key={this.props.id} onClick={this.focus}>
          <Editor editorState={this.state.editorState} onChange={this.onChange} ref={this.setDomEditorRef} onBlur={() => this.props.blur(this.props.id, this.state.editorState.getCurrentContent())}/>
        </div>
        <button className="btn btn-danger btn-block" type="button" onClick={(e) => this.props.delete(e, this.props.id)}>Delete note</button>
      </div>
    );
  }
}