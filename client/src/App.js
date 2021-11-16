import './styles/output.css'
import Home from './Pages/Admin/Home';
import {Route,Routes} from 'react-router-dom'
//import FormNewArrivals from '../src/Pages/Admin/FormNewArrivals'
import React from 'react';
import ClassificationList from './Pages/Admin/ClassificationList';
import ViewClassificationPage from './Pages/Admin/ViewClassification';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/admin" element={<Home/>}/>
          <Route path="/admin/add-classification" element={<ClassificationList/>}/>
          <Route path='/admin/view-classification' element={<ViewClassificationPage/>}/>
        </Routes>
    </div>     
  );
}

export default App;
