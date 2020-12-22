// @ts-nocheck
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './info.css'
import Loader from '.././card/loader/loader.js'
function Info(props) {
    const [pokemon, setPokemon] = useState([])
    const [pokeStat, setPokeStat] = useState([])
    const pokePage = window.location.pathname.replace(/\D/g, '')

    useEffect(() => {
        axios.get(`https://pokemonapishort.herokuapp.com/PokeApi/getStatOf/${pokePage}`)
            .then(result => {
                setPokemon(result.data)
                props.setLoading(false)
                console.log(result.data);
                setPokeStat([
                    result.data.attack,
                    result.data.defense,
                    result.data.hp,
                    result.data.specialAttack,
                    result.data.specialDefense,
                    result.data.speed
                ])
            })

    }, [setPokemon])
    const stats = ['Attack:', 'Defense:', 'HP:', 'Special Attack:', 'Special Defense:', 'Speed:']

    return (
        <div>
            {props.loading ? (<Loader />) : (
                <div className="info">
                    <img src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemon.id}.png?raw=true`} alt="" className="info-img" />

                    <div className="info-pokestat">
                        <div className="info-pokestat-name">{pokemon.name}</div>
                        <div className="info-pokestat-main">
                            {stats.map((stat, index) => (
                                <div className="stat" key={stat}>{stat} {pokeStat[index]} </div>
                            ))}
                        </div>
                        <div className="info-pokestat-types">
                            <div className="info-pokestat-types-title">Types:</div>
                            <div className="info-pokestat-types-container" >
                                {pokemon.types.map(types => (
                                    <div className="type" key={types}> {types}</div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
export default Info