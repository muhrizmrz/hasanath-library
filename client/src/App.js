import "./styles/output.css";
import Home from "./Pages/Admin/Home";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Data from "./Data.json";
import ClassificationList from "./Pages/Admin/ClassificationList";
import ViewClassificationPage from "./Pages/Admin/ViewClassification";
import Search from "./contexts/searchClassificationContext";
//import SearchClassification from './Pages/Admin/SearchClassification';
import SearchClassificationPage from "./Pages/Admin/SearchClassification";
import ViewChildClassifications from "./contexts/ViewChildClassifications";
import EditClassificationPage from "./Pages/Admin/EditClassification";
import EditClassificationContext from "./contexts/EditClassificationContext";
import Login from "./Pages/Admin/Login";
import IsLoggedAdmin from "./contexts/IsLoggedAdmin";

function App() {
  const [classfications, setClassifications] = useState(loadData());
  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate()

  function loadData() {
    var newArray = Data.map((obj) => {
      if (obj.classificationNumber == "000") {
        return {
          ...obj,
          isactiveFirstSummary: true,
          isactiveSecondSummary: true,
        };
      } else {
        return { ...obj };
      }
    });
    return newArray;
  }

  String.prototype.replaceAt = function (index, replacement) {
    return (
      this.substring(0, index) +
      replacement +
      this.substring(index + replacement.length)
    );
  };

  function setFirstSummaryActive(classificationNumber) {
    return () => {
      setClassifications((prev) =>
        prev.map((obj) => {
          return obj.classificationNumber == classificationNumber
            ? {
                ...obj,
                isactiveFirstSummary: true,
                isactiveSecondSummary: true,
              }
            : {
                ...obj,
                isactiveFirstSummary: false,
                isactiveSecondSummary: false,
              };
        })
      );
    };
  }

  function setSecondSummaryActive(classificationNumber) {
    return () => {
      setClassifications((prev) => {
        return prev.map((obj) => {
          return obj.classificationNumber == classificationNumber
            ? { ...obj, isactiveSecondSummary: true }
            : { ...obj, isactiveSecondSummary: false };
        });
      });
      //console.log(classfications)
    };
  }

  function handleSearch(classificationNumber) {
      const res = classfications.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(classificationNumber)
      );
      setSearchResult(prev => res)
      console.log(classificationNumber)
      navigate('/search-classification')
  }

  return (
    <div>
      <IsLoggedAdmin>
        <Search>
          <EditClassificationContext>
            <ViewChildClassifications>
              <Routes>
                <Route
                  path="/"
                  element={<Home isAdmin={false} data={classfications} handleSearch={handleSearch} />}
                />
                <Route path="/admin" element={<Home isAdmin={true} handleSearch={handleSearch} />} />
                <Route
                  path="/admin/add-classification"
                  element={<ClassificationList isAdmin={true} handleSearch={handleSearch} />}
                />
                <Route
                  path="/view-classification"
                  element={
                    <ViewClassificationPage
                      data={classfications}
                      setFirstSummaryActive={setFirstSummaryActive}
                      setSecondSummaryActive={setSecondSummaryActive}
                      handleSearch={handleSearch}
                      isAdmin={false}
                    />
                  }
                />
                <Route
                  path="/admin/view-classification"
                  element={<ViewClassificationPage isAdmin={true} handleSearch={handleSearch} />}
                />
             
                <Route
                  path="/search-classification"
                  element={<SearchClassificationPage data={classfications} handleSearch={handleSearch} searchResult={searchResult} />}
                />
                <Route
                  path="/admin/edit-classification"
                  element={<EditClassificationPage isAdmin={true} handleSearch={handleSearch} />}
                />
                <Route path="/admin/login" element={<Login />} />
              </Routes>
            </ViewChildClassifications>
          </EditClassificationContext>
        </Search>
      </IsLoggedAdmin>
    </div>
  );
}

export default App;
