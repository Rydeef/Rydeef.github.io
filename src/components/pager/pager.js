import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import LimitForm from './limitForm'

import './pager.css'

function Pager(props) {
    
    
    
    const handlePageClick = (data) => {
        let selected = data.selected * 12;
        props.setCurrentPage(selected)
        
    };
    useEffect(()=>{
        props.setLoading(true)
    },[props.currentPage])


    if (!props.isErr) {
        return (
            <div>
                {props.loadingPager ? (<></>) : (
                    <div className='container'>
                        <ReactPaginate
                            initialPage={0}

                            pageCount={props.pokeCount / props.limit}
                            marginPagesDisplayed={1.2}
                            pageRangeDisplayed={3}
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
                    </div>)
                }
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