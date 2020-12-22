import React, { useState } from 'react'
import './filter.css'
import FilterForm from '../form/form'




function Filter(props) {

    const [opened, setOpened] = useState(false)
    function hide() {
        opened ? (setOpened(false)) : (setOpened(true))
    }

    return (
        <div className={(opened ? ("filter-opened") : ("filter-hidden"))}>
            <div className="filter-stats">
                <FilterForm
                    setLoadingPager={props.setLoadingPager} setCurrentPage={props.setCurrentPage} some={props.some} setSome={props.setSome} typesArray={props.typesArray} setTypesArray={props.setTypesArray} filterObj={props.filterObj} setFilterObj={props.setFilterObj} types={props.types} setTypes={props.setTypes} setOpened={setOpened} setLoading={props.setLoading} setIsErr={props.setIsErr}
                />
            </div>
            <button className="filter-hide" onClick={hide}>{(opened ? ("Close") : ("Open"))}</button>
        </div>
    )
}


export default Filter