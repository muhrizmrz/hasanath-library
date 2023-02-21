import React, { createContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const LogInContext = createContext(null)

function IsLoggedAdmin({children}) {
    const [loginStatus, setLoginStatus] = useState(false)
    const navigate = useNavigate()
    const authorizeAdmin = (isAdmin)=>{
        if(isAdmin){
            axios.get('/admin/api/authorize-admin',{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            }).then((result) => {
                
                if (!result.data.admin) {
                    navigate('/admin/login')
                }
            }) 
        }
    }
    
    return (
        <LogInContext.Provider value={{loginStatus,setLoginStatus,authorizeAdmin}}>
            {children}
        </LogInContext.Provider>
    )
}

export default IsLoggedAdmin
