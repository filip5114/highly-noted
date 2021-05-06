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
            <div className="container-fluid vh-100 d-flex flex-column">
                <div className="row g-0 flex-shrink-0">
                    <div className="col-12 px-0">
                        <NavigationBar updateState={this.updateState} />
                    </div>
                </div>
                <div className="row g-0 flex-grow-1">
                    <div className="col-2 flex-grow-1 border-right border-secondary shadow-sm">
                        <NavigationPane updateState={this.updateState} data={this.state.data}/>
                    </div>
                    <div className="col flex-grow-1 d-flex flex-column">
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