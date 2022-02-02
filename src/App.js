import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contexts from "./Contexts";
import { useState, useEffect } from "react";
import Login from "./components/Login";


export default function App() {



    return (
        <Contexts.Provider value = {
            {

            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login></Login>}></Route>
                    {/* <Route path='/cadastro' element={<Register></Register>}></Route> */}
                </Routes>
            </BrowserRouter>
        </Contexts.Provider>
    )
}