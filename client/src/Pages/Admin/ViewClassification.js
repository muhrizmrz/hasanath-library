import React, { useContext, useLayoutEffect, useState } from 'react'
import ChildSummary from '../../components/Admin/ChildSummary'
import FirstSummary from '../../components/Admin/FirstSummary'
import Header from '../../components/Admin/Header'
import HundredDivisions from '../../components/Admin/HundredDivisions'
import SecondSummary from '../../components/Admin/SecondSummary'
import { LogInContext } from '../../contexts/IsLoggedAdmin'
import { SecondSummaryContext } from '../../contexts/SecondSummaryContext'

function ViewClassificationPage(props) {
    const {authorizeAdmin} = useContext(LogInContext)
   
    useLayoutEffect(()=>{
        authorizeAdmin(props.isAdmin)
    })
    
    return (
        <div>
            <Header isAdmin={props.isAdmin} data={props.data} handleSearch={props.handleSearch} />
            <div className="grid grid-cols-7 h-screen">
                {/*<SecondSummaryContext.Provider value={{firstSummary, setFirstSummary,loading,setLoading,hundredClassification,setHundredClassification,activeClassification, setActiveClassification,childClassification,setChildClassification,classificationCount, setClassificationCount,activeTen, setActiveTen,mainClassification, setMainClassification,first, setFirst,summaryFirst, setSummaryFirst}}>*/}
                    <FirstSummary data={props.data} setFirstSummaryActive={props.setFirstSummaryActive} />
                    <SecondSummary data={props.data} setSecondSummaryActive={props.setSecondSummaryActive} />
                    <HundredDivisions data={props.data} />
                {/*</SecondSummaryContext.Provider>*/}
            </div>
        </div>
    )
}

export default ViewClassificationPage
