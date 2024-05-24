import Nav from "./components/global/Nav";
import "./css/App.css";
import "./css/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import News from "./pages/News";
import Private from "./pages/Private";
function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Apply />} path="apply" />
                <Route element={<News />} path="news" />
                <Route element={<Private />} path="private" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
