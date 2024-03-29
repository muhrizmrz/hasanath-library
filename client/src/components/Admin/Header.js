import React, { useContext, useState } from 'react'
import axios from 'axios'
import { SearchContext } from '../../contexts/searchClassificationContext'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

function Header(props) {
    const [keywordForSearchClassification, setKeywordForSearchClassification] = useState()
    const { loadingSearch, setLoadingSearch, setSearchClassificationResult,setSearchText} = useContext(SearchContext)
    const navigate = useNavigate()
    var classificationLink, homeLink

  

    function handleSearch(value){
        setKeywordForSearchClassification(value)
        props.handleSearch(value)
    }

    function disableSubmit(e){
        e.preventDefault()
    }

    const handleLogout = ()=>{
        axios.get('/admin/api/logout').then((result)=>{
            if(result.data){
                navigate('/')
            }
        })
    }

  

    return (
        <div>
            <div className="fixed right-0 left-0 top-0 z-20">
                <header className="w-100 p-4 px-16 bg-white h-auto shadow-lg">
                    <div className="grid grid-cols-4 justify-between place-content-center">
                        <div>
                            <h1 className="text-lg font-bold">Hasanath Library</h1>
                        </div>
                        <form className="col-span-2 flex" onSubmit={(e) => handleSearch(e)}>
                            <input type='text' placeholder='Search' value={keywordForSearchClassification} onChange={(e) => handleSearch(e.target.value)} className='py-1 px-3 bg-white rounded w-3/4 border border-transparent focus:outline-none ring-2 ring-blue-400 shadow-lg focus:ring-blue-500 text-gray-500' />
                            <input type="submit" className="ml-4 p-1 px-6 rounded-md text-white bg-blue-500" value="Search" />
                        </form>
                        <div className="text-right text-gray-400 flex">
                            <p className="cursor-pointer" onClick={() => navigate('/')}>Home</p>
                            <p className="cursor-pointer ml-4" onClick={() => navigate('/view-classification')}>Classification</p>               
                            {props.isAdmin && <p className="cursor-pointer ml-4" onClick={() => navigate('/admin/add-classification')}>Add Classification</p>}
                            {props.isAdmin? <p className="cursor-pointer ml-4 text-red-600" onClick={handleLogout}>Logout</p>:<p className="cursor-pointer ml-4 text-green-600" onClick={()=>navigate('/admin/login')}>Admin Login</p>}
                        </div>
                    </div>
                </header>
            </div>
            {loadingSearch && <Loading />}
        </div>
    )
}

export default Header
