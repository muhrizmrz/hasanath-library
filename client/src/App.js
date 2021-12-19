import './styles/output.css'
import Home from './Pages/Admin/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import ClassificationList from './Pages/Admin/ClassificationList';
import ViewClassificationPage from './Pages/Admin/ViewClassification';
import Search from './contexts/searchClassificationContext';
//import SearchClassification from './Pages/Admin/SearchClassification';
import SearchClassificationPage from './Pages/Admin/SearchClassification';
import viewChildClassifications from './contexts/viewChildClassifications';

function App() {
  return (
    <div>
      <Search>
        <viewChildClassifications>
          <Routes>
            <Route path="/" element={<Home isAdmin={false}/>} />
            <Route path="/admin" element={<Home isAdmin={true}/>} />
            <Route path="/admin/add-classification" element={<ClassificationList isAdmin={true}/>} />
            <Route path='/view-classification' element={<ViewClassificationPage isAdmin={false}/>} />
            <Route path='/admin/view-classification' element={<ViewClassificationPage isAdmin={true}/>}/>
            <Route path='/admin/search-classification' element={<SearchClassificationPage />} />

          </Routes>
        </viewChildClassifications>
      </Search>
    </div>
  );
}

export default App;
