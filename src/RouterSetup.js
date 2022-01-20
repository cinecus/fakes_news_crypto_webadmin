import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Navbar,
    Sidebar,
    Loading,
    Footer,
    Hero
} from './components'

import {
    Home,
    Products,
    SingleProduct,
    Error
} from './pages'

const RouterSetup = () => {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:product_id' element={<SingleProduct />} />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default RouterSetup
