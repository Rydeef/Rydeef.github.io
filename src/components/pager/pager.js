import React from 'react'
import ReactPaginate from 'react-paginate'
import LimitForm from './limitForm'
import './pager.css'

function Pager(props) {


    const handlePageClick = (data) => {
        let selected = data.selected * 12;
        props.setCurrentPage(selected)
        props.setLoading(true)

    };

    if (!props.isErr) {
        return (
            <div className='container'>
                <ReactPaginate
                    initialPage={0}
                    pageCount={props.pokeCount / props.limit}
                    marginPagesDisplayed={0.5}
                    pageRangeDisplayed={4}
                    containerClassName='pagination'
                    pageClassName='pagination-page'
                    pageLinkClassName='pagination-link'
                    nextLinkClassName='pagination-next'
                    previousLinkClassName='pagination-prev'
                    activeClassName='pagination-active'
                    breakClassName='pagination-page'
                    breakLinkClassName='pagination-link'
                    onPageChange={handlePageClick}
                />
                <LimitForm setLoading={props.setLoading} setLimit={props.setLimit} limit={props.limit} pokeCount={props.pokeCount} />
            </div>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }



}


export default Pager