import React, { createContext, useState } from 'react'

export const ViewChildClassification = createContext(null)

function ViewChildClassifications({children}) {
    const [childData, setChildData] = useState(null)
    return (
        <div>
            <ViewChildClassification.Provider value={{childData,setChildData}}>
                {children}
            </ViewChildClassification.Provider>
        </div>
    )
}

export default ViewChildClassifications
