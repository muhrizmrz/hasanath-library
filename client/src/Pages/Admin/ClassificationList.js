import React from 'react'
import AddClassification from '../../components/Admin/AddClassification'
import Header from '../../components/Admin/Header'
//import SuccessfullMsg from '../../components/Admin/SuccessfullMsg'

function ClassificationList(props) {
    return (
        <div>
            <Header isAdmin={props.isAdmin}/>
            <AddClassification/>
        </div>
    )
}

export default ClassificationList
