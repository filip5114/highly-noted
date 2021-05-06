import React from 'react';
import MyEditor from './Editor';
import NavigationPane from './NavigationPane';
import NavigationBar from './NavigationBar';
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
            <div id="app" className="container-fluid min-vh-100 d-flex flex-column">
                <div className="row">
                    <div className="col-md-12 p-0">
                        <NavigationBar updateState={this.updateState} currentNoteId={this.state.currentNote} key={this.state.currentNote} />
                    </div>
                </div>
                <div className="row flex-grow-1">
                    <div className="col-md-2 border-right border-secondary shadow-sm">
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