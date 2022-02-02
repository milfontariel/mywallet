import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contexts from "./Contexts";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";


export default function App() {



    return (
        <Contexts.Provider value = {
            {

            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login></Login>}></Route>
                    <Route path='/register' element={<Register></Register>}></Route>
                    <Route path='/home' element={<Home></Home>}></Route>
                </Routes>
            </BrowserRouter>
        </Contexts.Provider>
    )
}