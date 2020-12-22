import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { Img } from "react-image"
import errorImg from '../../img/400.png'
import imgLoader from '../../img/imgLoader.gif'
import './card.css'
import Loader from './loader/loader.js'
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";


function Card(props) {
    const [pokemon, setPokemon] = useState([])
    const objLength = Object.keys(props.filterObj).length
    const history = useHistory()

    useEffect(() => {
        const { attack, hp, defense, specialAttack, specialDefense, speed } = props.filterObj
        const statFilter = []
        if (attack) statFilter.push({ attack })
        if (hp) statFilter.push({ hp })
        if (defense) statFilter.push({ defense })
        if (specialAttack) statFilter.push({ specialAttack })
        if (specialDefense) statFilter.push({ specialDefense })
        if (speed) statFilter.push({ speed })

        axios.post('https://pokemonapishort.herokuapp.com/PokeApi/getPokemons', {
            filterOptions: [
                (objLength === 0) ? [] : {
                    statFilter
                },
                { nameFilter: props.filterObj.name },
                { typeFilter: props.typesArray }

            ],
            limit: props.limit,
            offset: props.currentPage
        })
            .then(result => {
                setPokemon(result.data.pokemons)
                props.setLoading(false)
                props.setPokeCount(result.data.count)
                props.setLoadingPager(false)
            })
            .catch(err => {
                if (err.request) {
                    props.setIsErr(true)
                }
            })
    }, [props.currentPage, props.limit, props.filterObj])
  

    if (!props.isErr) {
        return (
            <div>
                {props.loading ? (<Loader />) : (
                    <div className='cardbox'>
                        <Router >
                            {pokemon.map(obj => (
                                <Link to={String(obj.id)} className="card" href="#" key={obj._id} onClick={() => history.push(`/${obj.id}`)}>
                                    <Img
                                        className="card-img"
                                        key={obj.id}
                                        src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${obj.id}.png?raw=true`}
                                        loader={
                                            <img
                                                className="card-img"
                                                src={imgLoader}
                                            />
                                        }
                                        unloader={
                                            <img
                                                className="card-img"
                                                src={errorImg}
                                            />
                                        }
                                    />

                                    <p className="card-title" key={obj.name}>{obj.name}</p>
                                </Link>
                            ))}
                            
                        </Router>
                    </div>
                )}
            </div>
        )
    }
    else {
        return (
            <div className="error">
                <img src={errorImg} alt="" className="error-img" />
                <label htmlFor="error-img" className="error-label">Error 400</label>
                <label htmlFor="error-img" className="error-label">This pokemons does not exist! Please try again</label>
            </div>
        )
    }
}


export default Card