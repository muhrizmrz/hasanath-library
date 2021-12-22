import React, { useContext, useLayoutEffect } from 'react'
import Header from '../../components/Admin/Header'
import SearchClassification from '../../components/Admin/SearchClassification'
import { LogInContext } from '../../contexts/IsLoggedAdmin'
//import Search from '../../contexts/searchClassificationContext'

function SearchClassificationPage(props) {
    const {authorizeAdmin} = useContext(LogInContext)
    useLayoutEffect(()=>{
        authorizeAdmin(props.isAdmin)
    })
    return (
        <div>
            <Header isAdmin={props.isAdmin}/>
            <SearchClassification isAdmin={props.isAdmin}/>
        </div>
    )
}

export default SearchClassificationPage
