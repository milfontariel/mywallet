import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contexts from "./Contexts";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Entry from "./components/Entry";
import Output from "./components/Output";

export default function App() {

    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [summaryItems, setSummaryItems] = useState([]);
    const [balance, setBalance] = useState(0);

    return (
        <Contexts.Provider value = {
            {
                token, setToken, name, setName, summaryItems, setSummaryItems,
                balance, setBalance
            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login></Login>}></Route>
                    <Route path='/register' element={<Register></Register>}></Route>
                    <Route path='/home' element={<Home></Home>}></Route>
                    <Route path='/input' element={<Entry></Entry>}></Route>
                    <Route path='/output' element={<Output></Output>}></Route>
                </Routes>
            </BrowserRouter>
        </Contexts.Provider>
    )
}