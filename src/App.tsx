import Nav from "./components/global/Nav";
import "./css/App.css";
import "./css/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route element={<Home />} path="/"/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
