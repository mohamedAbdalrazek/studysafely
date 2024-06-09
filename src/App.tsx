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
import Videos from "./pages/Videos";
import Agent from "./pages/Agent";
import PrivatePage from "./pages/PrivatePage";
import PartialPage from "./pages/PartialPage";
import VideoPage from "./pages/VideoPage";
import Other from "./pages/Other";
import PrivateMain from "./components/private/private-page/PrivateMain"
import PrivatePartial from "./components/private/private-page/PrivatePartial"
import PublicPage from "./pages/PublicPage";
import Footer from "./components/global/Footer";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Apply />} path="apply" />
                <Route element={<News />} path="news" />
                <Route element={<Private />} path="private" />
                <Route element={<PrivatePage />} path="private/:id">
                    <Route element={<PrivateMain />} index />
                    <Route element={<PrivatePartial />} path="partial" />
                </Route>
                <Route element={<Public />} path="public" />
                <Route element={<PublicPage />} path="public/:id" />
                <Route element={<Partial />} path="partial" />
                <Route element={<PartialPage />} path="partial/:id" />
                <Route element={<Videos />} path="videos" />
                <Route element={<VideoPage />} path="videos/:id" />
                <Route element={<Agent />} path="agent" />
                <Route element={<Other />} path="/:id" />

            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
