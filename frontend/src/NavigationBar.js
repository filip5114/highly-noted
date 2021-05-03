import React from 'react';

export default class NavigationBar extends React.Component {
    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-brand" href="#">Navbar</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <button className="nav-link active" aria-current="page" href="#">Home</button>
                        <button className="nav-link" href="#">Features</button>
                        <button className="nav-link" href="#">Pricing</button>
                        <button className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</button>
                    </div>
                    </div>
                </div>
            </nav>
        )
    }
}