import React from "react";
import Header from "./components/Header/Header.js"
import Home from "./components/Home/Home.js"
import MovieDetail from "./components/MovieDetail/MovieDetail.js"
import PageNotFound from "./components/PageNotFound/PageNotFound.js"
import Footer from "./components/Footer/Footer.js"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.scss'

const App = () =>{
    return (
        <div className="app">
            <BrowserRouter>
                <Header/>
                <Routes>
                        <Route path="/" exact Component={Home}></Route>
                        <Route path="/movie/:imdbID" Component={MovieDetail}></Route>
                        <Route path="*" Component={PageNotFound}></Route>
                    </Routes> 
                <Footer/>
            </BrowserRouter>
        </div>
    )
}
export default App;