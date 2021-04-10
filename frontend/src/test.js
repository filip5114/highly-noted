import axios from 'axios';
import React from 'react';

export default class Test extends React.Component{
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api')
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }

    render() {
        return (
            <ul>
                { this.state.data.map(d => <li key={d.title}>{d.title}: {d.text}</li>) }
            </ul>
        )
    }
} 