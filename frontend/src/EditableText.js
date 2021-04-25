import axios from 'axios';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class EditableText extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: this.props.title + '\n' + this.props.text,
            edit: false
        };

        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    edit = () => {
        this.setState({edit: !this.state.edit});
    }

    onClick = e => {
        this.edit();
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onBlur = e => {
        const data = {
            'id': this.props.id,
            'text': this.state.text
        }

        axios.post(`http://localhost:5000/api/v1/note/edit`, data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
            
        this.edit();
    }

    render(){
        this.editor = <textarea name="text" value={this.state.text} onChange={this.handleChange} onBlur={this.onBlur} />
        
        return (
            this.state.edit ?
            this.editor
            : <div className="note" onClick={(e) => this.onClick(e)}><ReactMarkdown source={this.state.text} /></div>
        )
    }
}