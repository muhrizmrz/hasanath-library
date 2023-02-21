import React, { useContext, useLayoutEffect } from 'react'
import AddClassification from '../../components/Admin/AddClassification'
import Header from '../../components/Admin/Header'
import { LogInContext } from '../../contexts/IsLoggedAdmin'


function ClassificationList(props) {
    const {authorizeAdmin} = useContext(LogInContext)
    useLayoutEffect(() => {
        authorizeAdmin(props.isAdmin)
    }, [])
    return (
        <div>
            <Header isAdmin={props.isAdmin} handleSearch={props.handleSearch} />
            <AddClassification />
        </div>
    )
}

export default ClassificationList
