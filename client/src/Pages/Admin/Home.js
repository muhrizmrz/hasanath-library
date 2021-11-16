import Header from "../../components/Admin/Header";

import React from 'react'
import NewArrivals from '../../components/Admin/NewArrivals';

function Home() {
    return (
        <div className="h-screen">
            <Header/>
            <NewArrivals/>
        </div>
    )
}

export default Home
