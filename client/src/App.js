import './styles/output.css'
import Home from './Pages/Admin/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import ClassificationList from './Pages/Admin/ClassificationList';
import ViewClassificationPage from './Pages/Admin/ViewClassification';
import Search from './contexts/searchClassificationContext';
//import SearchClassification from './Pages/Admin/SearchClassification';
import SearchClassificationPage from './Pages/Admin/SearchClassification';
import ViewChildClassifications from './contexts/ViewChildClassifications';
import EditClassificationPage from './Pages/Admin/EditClassification';
import EditClassificationContext from './contexts/EditClassificationContext';
import Login from './Pages/Admin/Login';
import IsLoggedAdmin from './contexts/IsLoggedAdmin';

function App() {
  return (
    <div>
      <IsLoggedAdmin>
        <Search>
          <EditClassificationContext>
            <ViewChildClassifications>
              <Routes>
                <Route path="/" element={<Home isAdmin={false} />} />
                <Route path="/admin" element={<Home isAdmin={true} />} />
                <Route path="/admin/add-classification" element={<ClassificationList isAdmin={true} />} />
                <Route path='/view-classification' element={<ViewClassificationPage isAdmin={false} />} />
                <Route path='/admin/view-classification' element={<ViewClassificationPage isAdmin={true} />} />
                <Route path='/admin/search-classification' element={<SearchClassificationPage isAdmin={true} />} />
                <Route path='/search-classification' element={<SearchClassificationPage />} />
                <Route path='/admin/edit-classification' element={<EditClassificationPage isAdmin={true} />} />
                <Route path='/admin/login' element={<Login />} />
              </Routes>
            </ViewChildClassifications>
          </EditClassificationContext>
        </Search>
      </IsLoggedAdmin>
    </div>
  );
}

export default App;
