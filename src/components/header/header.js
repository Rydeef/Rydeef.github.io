import React from 'react'
import {useHistory, BrowserRouter as Router, Link} from 'react-router-dom'
import './header.css'
import logo from '../../img/logo.png'
import pokedex from '../../img/pokedex.png'


function Header() {
    const history = useHistory()
    return (
        <header className="header">
            <div className="header-container">
                <Router>
                    <Link to="/" href="" onClick={() => history.push('/')}>
                        <img src={logo} alt="" className="header-container-logo" />
                    </Link>
                </Router>
                <img src={pokedex} alt="" className="header-container-pokedex" />
            </div>
        </header>
    )
}

export default Header