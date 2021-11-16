import React, { useEffect, useState } from 'react';
import './customers.css';
const axios = require('axios');

// Make a request for a user with a given ID

function Customers(){
  const [customers, setCustomers] = useState([])
  useEffect(() => {
    axios.get('/api/customers')
      .then((response)=>{
        // handle success
        setCustomers(response.data)
        console.log(customers);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      })
  }, [])
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {
            customers.map(function(obj){
              return(
                <li>{obj.firstName}</li>
              )     
            })
          }
        </ul>
      </div>
    );
  
}

export default Customers;
