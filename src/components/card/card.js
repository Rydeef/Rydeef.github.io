import axios from 'axios'
import React, { useState, useEffect } from 'react'
import errorImg from '../../img/400.png'
import './card.css'
import Loader from './loader/loader.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function Card(props) {
    const [pokemon, setPokemon] = useState([])
    const objLength = Object.keys(props.filterObj).length
    // useEffect(() => {
    //     let arr = []
    //     let obj = {}
    //     let Obj = {}

    //     for (const [key, value] of Object.entries(props.filterObj)) {

    //         if (value !== '' && key !== 'name') {
    //             obj[key] = value
    //             Obj = [obj]
    //             console.log(Obj);
    //             props.setSome(...Obj)
    //         }
    //     }

    //     console.log(props.some);

    // }, [props?.filterObj])

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
                        <Router>
                            {pokemon.map(obj => (
                                <Link to={String(obj.id)} className="card" href="#" key={obj._id} onClick={function () { window.location.assign(`/${obj.id}`) }}>
                                    <img src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${obj.id}.png?raw=true`} className="card-img" onError={(e) => e.target.src = errorImg} key={obj.id} />
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