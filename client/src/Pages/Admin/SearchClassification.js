import React, { useContext, useLayoutEffect } from 'react'
import Header from '../../components/Admin/Header'
import SearchClassification from '../../components/Admin/SearchClassification'
import { LogInContext } from '../../contexts/IsLoggedAdmin'
//import Search from '../../contexts/searchClassificationContext'

function SearchClassificationPage(props) {
    const {authorizeAdmin} = useContext(LogInContext)


    return (
        <div>
            <Header isAdmin={props.isAdmin} handleSearch={props.handleSearch}/>
            <SearchClassification isAdmin={props.isAdmin} data={props.data} searchResult={props.searchResult}/>
        </div>
    )
}

export default SearchClassificationPage
