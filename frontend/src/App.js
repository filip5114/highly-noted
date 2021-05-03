import React from 'react';
import MyEditor from './Editor';
import NavigationPane from './NavigationPane';
import './App.css';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentNote: null
        }

        this.updateState = this.updateState.bind(this);
    };

    updateState = (state, data) => {
        this.setState({
            [state]: data
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-2">
                        <NavigationPane updateState={this.updateState} data={this.state.data}/>
                    </div>
                    <div className="col">
                        {
                            this.state.currentNote ? 
                                <MyEditor id={this.state.currentNote.id} content={this.state.currentNote.content} data-key={this.state.currentNote.id} key={this.state.currentNote.id} updateState={this.updateState} />                        
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }
} 