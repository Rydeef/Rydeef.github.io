import React, { useState } from 'react'
import Info from '../components/info/info'
import Header from '../components/header/header'

function PokeInfo(props) {

    const [loading, setLoading] = useState(true)

    return (
        <div>
            <Header />
            <Info setLoading={setLoading} loading={loading} />
        </div>
    )
}
export default PokeInfo