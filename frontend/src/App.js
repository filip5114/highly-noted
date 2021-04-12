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
        this.liClick = this.liClick.bind(this);
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
        axios.post(`http://localhost:5000/api/v1/todo`, data)
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    liClick = (id, e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/v1/todo/delete`, {id: id})
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
                    { this.state.data.map(d => <li key={d._id.$oid} onClick={(e) => this.liClick(d._id.$oid, e)}>{d.title}: {d.text}</li>) }
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