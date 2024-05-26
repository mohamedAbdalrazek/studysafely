import Nav from "./components/global/Nav";
import "./css/App.css";
import "./css/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import News from "./pages/News";
import Private from "./pages/Private";
import Public from "./pages/Public";
import Partial from "./pages/Partial";
function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Apply />} path="apply" />
                <Route element={<News />} path="news" />
                <Route element={<Private />} path="private" />
                <Route element={<Public />} path="public" />
                <Route element={<Partial />} path="partial" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
