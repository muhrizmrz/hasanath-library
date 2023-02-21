import React, { useContext, useLayoutEffect } from 'react'
import EditClassification from '../../components/Admin/EditClassification'
import Header from '../../components/Admin/Header'
import { LogInContext } from '../../contexts/IsLoggedAdmin'

function EditClassificationPage(props) {
    const {authorizeAdmin} = useContext(LogInContext)
    useLayoutEffect(()=>{
        authorizeAdmin(props.isAdmin)
    })
    return (
        <div>
            <Header isAdmin={props.isAdmin} handleSearch={props.handleSearch}/>
            <EditClassification isAdmin={props.isAdmin}/>
        </div>
    )
}

export default EditClassificationPage
