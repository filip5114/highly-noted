import axios from 'axios';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: '',
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delNote = this.delNote.bind(this);
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

    handleChange = e => {
        this.setState({[e.target.name]: [e.target.value]});
        this.setState({[e.target.name]: [e.target.value]});
    }

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            'title': this.state.title,
            'value': this.state.value
        };
        axios.post(`http://localhost:5000/api/v1/note/add`, data)
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    delNote = (id, e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/v1/note/delete`, {id: id})
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </label>
                    <label>
                        Text:
                        <textarea name="value" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Send" />
                </form>
                { this.state.data.map(d => 
                    <div key={d.id}>
                        <h2 onClick={(e) => this.delNote(d.id, e)}>{d.title}</h2>
                        <ReactMarkdown source={d.text} />
                    </div>
                )}
            </div>
        )
    }
} 