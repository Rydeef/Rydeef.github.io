import React, { useState } from 'react'
import Header from '../components/header/header'
import Card from '../components/card/card'
import Pager from '../components/pager/pager'
import Filter from '../components/filter/filter'

function Pokedex() {
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(12)
    const [filterObj, setFilterObj] = useState({})
    const [pokeCount, setPokeCount] = useState()
    const [types, setTypes] = useState([])
    const [typesArray, setTypesArray] = useState([])
    const [isErr, setIsErr] = useState(false)
    const [some, setSome] = useState({})
    return (
        <div>
            <Header />
            <Filter
                typesArray={typesArray} some={some} setSome={setSome} setTypesArray={setTypesArray} filterObj={filterObj} setFilterObj={setFilterObj} setLoading={setLoading} types={types} setTypes={setTypes} setIsErr={setIsErr}
            />
            <Card
                some={some} setSome={setSome} currentPage={currentPage} isErr={isErr} typesArray={typesArray} setTypesArray={setTypesArray} loading={loading} setLoading={setLoading} limit={limit} filterObj={filterObj} pokeCount={pokeCount} setPokeCount={setPokeCount} isErr={isErr} setIsErr={setIsErr}
            />
            <Pager
                currentPage={currentPage} setLoading={setLoading} setCurrentPage={setCurrentPage} limit={limit} setLimit={setLimit} pokeCount={pokeCount} isErr={isErr}
            />
        </div>
    )
}
export default Pokedex