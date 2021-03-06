import React,{createContext, useState} from 'react'

export const SearchContext = createContext(null)

function Search({children}){
    const [searchClassificationResult, setSearchClassificationResult] = useState([])
    const [searchText,setSearchText] = useState(null)
    const [loadingSearch,setLoadingSearch] = useState(false)
    return(
        <SearchContext.Provider value={{searchClassificationResult,setSearchClassificationResult,searchText,setSearchText,loadingSearch,setLoadingSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

export default Search