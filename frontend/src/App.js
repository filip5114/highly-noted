import axios from 'axios';
import React from 'react';

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

    handleChange = event => {
        this.setState({[event.target.name]: [event.target.value]});
        this.setState({[event.target.name]: [event.target.value]});
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            'title': this.state.title,
            'value': this.state.value
        };
        axios.post(`http://localhost:5000/api/v1/todo`, data)
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
                <ul>
                    { this.state.data.map(d => <li key={d.title}>{d.title}: {d.text}</li>) }
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </label>
                    <label>
                        Text:
                        <input type="text" name="value" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Send" />
                </form>
            </div>
        )
    }
} 