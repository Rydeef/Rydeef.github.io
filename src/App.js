import React from 'react'
import Pokedex from './pages/pokedex'
import PokeInfo from './pages/pokeinfo'
import {useHistory, BrowserRouter, Router, Switch, Route } from "react-router-dom";




function App() {
  const pokePage = window.location.pathname.replace(/\D/g, '')
  const history = useHistory()
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={Pokedex} />
        <Route path={`/${pokePage}`} component={PokeInfo} />
      </Switch>

    </BrowserRouter>
  )

}
export default App
