import React, { createContext, useState } from 'react'

export const EditContext = createContext(null)

function EditClassificationContext({children}) {
    const [toBeEdit, setToBeEdit] = useState()
    const [toBeDelete, setToBeDelete] = useState()
    return (
        <EditContext.Provider value={{toBeEdit, setToBeEdit,toBeDelete, setToBeDelete}}>
            {children}
        </EditContext.Provider>
    )
}

export default EditClassificationContext
