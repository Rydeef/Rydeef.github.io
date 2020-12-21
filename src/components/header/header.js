import React from 'react'
import './header.css'
import logo from '../../img/logo.png'
import pokedex from '../../img/pokedex.png'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header() {

    return (
        <header className="header">
            <div className="header-container">
                <Router>
                    <Link to="/" href="" onClick={function () { window.location.assign('/') }}>
                        <img src={logo} alt="" className="header-container-logo" />
                    </Link>
                </Router>
                <img src={pokedex} alt="" className="header-container-pokedex" />
            </div>
        </header>
    )
}

export default Header