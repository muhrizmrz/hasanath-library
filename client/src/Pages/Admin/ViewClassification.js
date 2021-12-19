import React, { useState } from 'react'
import ChildSummary from '../../components/Admin/ChildSummary'
import FirstSummary from '../../components/Admin/FirstSummary'
import Header from '../../components/Admin/Header'
import HundredDivisions from '../../components/Admin/HundredDivisions'
import { SecondSummaryContext } from '../../contexts/SecondSummaryContext'

function ViewClassificationPage(props) {
    const [firstSummary, setFirstSummary] = useState('000')
    const [loading, setLoading] = useState(false)
    const [hundredClassification, setHundredClassification] = useState([])
    const [activeClassification, setActiveClassification] = useState('000')
    const [childClassification,setChildClassification] = useState([])
    const [classificationCount, setClassificationCount] = useState(0)
    const [activeTen, setActiveTen] = useState('000')
    const [mainClassification, setMainClassification] = useState([])
    const [first, setFirst] = useState()
    return (
        <div>
            <Header isAdmin={props.isAdmin}/>
            <div className="grid grid-cols-7 h-screen">
                <SecondSummaryContext.Provider value={{firstSummary, setFirstSummary,loading,setLoading,hundredClassification,setHundredClassification,activeClassification, setActiveClassification,childClassification,setChildClassification,classificationCount, setClassificationCount,activeTen, setActiveTen,mainClassification, setMainClassification,first, setFirst}}>
                    <FirstSummary/>
                    <HundredDivisions/>
                    <ChildSummary/>
                </SecondSummaryContext.Provider>
            </div>
        </div>
    )
}

export default ViewClassificationPage
