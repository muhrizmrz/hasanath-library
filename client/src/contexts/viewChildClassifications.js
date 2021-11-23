import React, { createContext, useState } from 'react'

export const ViewChildClassification = createContext(null)

function viewChildClassifications({children}) {
    const [childData, setChildData] = useState(null)
    return (
        <div>
            <ViewChildClassification.Provider value={{childData,setChildData}}>
                {children}
            </ViewChildClassification.Provider>
        </div>
    )
}

export default viewChildClassifications
