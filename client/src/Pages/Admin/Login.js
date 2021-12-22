import React, { useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate()
    useLayoutEffect(()=>{
        axios.get('/admin/api/authorize-admin').then((result) => {
            if (result.data) {
              navigate('/admin')
            }
          })
    },[])
    function handleLogin(e){
        e.preventDefault()
        const headers = {
            "Content-Type": "application/json"
        }
        axios.post('/admin/api/login',{
            username: username,
            password: password
        },headers).then((result)=>{
            console.log(result.data)
            if(result.data){
                navigate('/admin')
                setLoginError(false)
            }else{
                setLoginError(true)
            }
        })
    }
    return (
        <div className=''>
            <div className='w-1/4 bg-gray-100 border-2 p-6 mx-auto my-24'>
                <div className='text-center'>
                    <h1 className='text-gray-600 font-bold text-2xl font-serif'>Hasanath Library</h1>
                    <h3 className='text-gray-500 mt-2 font-bold text-lg'>Admin Login</h3>
                    <form onSubmit={(e)=>handleLogin(e)}>
                        <div class="grid grid-cols-1 space-y-2 col-span-2 mt-12">
                            <input type="text"  id="username" onChange={(e)=>setUsername(e.target.value)} name="username" placeholder="Username" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                        </div>
                        <div class="grid grid-cols-1 space-y-2 col-span-2 mt-3">
                            <input type="password"  id="password" onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="Password" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                        </div>
                        {loginError &&
                            <p className='text-red-500'>Username or password is incorrect</p>
                        }
                        <button type='submit' className='p-2 px-4 w-full bg-blue-500 mt-2 text-white rounded-md'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
