import React from 'react'


function LimitForm(props) {

    const limitValues = ['10', '20', '50']

    return (
        <div className="limit">
            <label htmlFor="limit-label">Limit: </label>
            <div className="limit-buttons">
                {limitValues.map((limit) => (
                    <button className="limit-submit" key={limit} onClick={(e) => { props.setLimit(e.target.value); props.setLoading(true) }} value={limit}> {limit}</button>
                ))}
            </div>
        </div>
    )
}
//@ts-ignore


export default LimitForm