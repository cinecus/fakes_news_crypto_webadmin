import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

import {
    Navbar,
    Sidebar,
    Loading,
    Footer,
    Hero
} from './components'

import {
    Home,
    AllArticlePage,
    Products,
    SingleProduct,
    AddArticlePage,
    EditArticlePage,
    LoginPage,
    Error
} from './pages'
const PrivateWrapper = () => {
    const token_id = localStorage.getItem('token_id')
    const user_id = localStorage.getItem('user_id')
    // console.log(token)
    return (!!token_id && token_id !== '') && (!!user_id && user_id !== '') ? <Outlet /> : <Navigate to='/authen' />
}

const RouterSetup = () => {
    return (
        <Router>
            {/* <Navbar /> */}



            <Routes>
                <Route path='/authen' element={<LoginPage />} />
                <Route element={<>
                    <Sidebar />
                    <PrivateWrapper />
                </>}>
                    <Route path='/' element={<Home />} />
                    <Route path='/allarticle' element={<AllArticlePage />} />
                    <Route path='/addarticle' element={<AddArticlePage />} />
                    <Route path='/editarticle/:article_id' element={<EditArticlePage />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/products/:product_id' element={<SingleProduct />} />
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
            {/* <Footer /> */}
        </Router>
    )
}

export default RouterSetup
