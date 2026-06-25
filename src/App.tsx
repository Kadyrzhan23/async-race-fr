import React from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import GaragePage from "./pages/GaragePage";
import WinnersPage from "./pages/WinnersPage";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/garage" element={<GaragePage/>}/>
                <Route path="/winners" element={<WinnersPage/>}/>
                <Route path="*" element={<Navigate to="/garage" replace />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
