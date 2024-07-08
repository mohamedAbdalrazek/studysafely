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
import PrivateMain from "./components/private/private-page/PrivateMain";
import PrivatePartial from "./components/private/private-page/PrivatePartial";
import PublicPage from "./pages/PublicPage";
import Layout from "./Layout";
import AdminLayout from "./admin/AdminLayout";
import EditLanding from "./admin/home/EditLanding";
import EditNewsHome from "./admin/home/EditNewsHome";
import EditPublicHome from "./admin/home/EditPublicHome";
import EditPrivateHome from "./admin/home/EditPrivateHome";
import EditOtherHome from "./admin/home/EditOtherHome";
import EditAccepted from "./admin/home/EditAccepted";
import EditNav from "./admin/global/EditNav";
import EditFooter from "./admin/global/EditFooter";
import EditPublicPage from "./admin/public/EditPublicPage";
import EditPrivatePage from "./admin/private/EditPrivatePage";
import EditApply from "./admin/other/EditApply";
import EditNewsPage from "./admin/news/EditNewsPage";
import EditPartialPage from "./admin/partial/EditPartialPage";
import EditAgentPage from "./admin/other/EditAgentPage";
import EditPublicList from "./admin/public/EditPublicList";
import EditPrivateList from "./admin/private/EditPrivateList";
import EditPartialList from "./admin/partial/EditPartialList";
import EditNewsList from "./admin/news/EditNewsList";
import EditOtherList from "./admin/other/EditOtherList";
import AddPublicUni from "./admin/public/AddPublicUni";
import EditPublicUni from "./admin/public/EditPublicUni";
import AddPrivateUni from "./admin/private/AddPrivateUni";
import EditPrivateUni from "./admin/private/EditPrivateUni";
import AddPartialScholar from "./admin/partial/AddPartiallScholar";
import EditPartialScholar from "./admin/partial/EditPartialScholar";
import AddNews from "./admin/news/AddNews";
import AddOtherService from "./admin/other/AddOtherService";
import EditOtherServices from "./admin/other/EditOtherServices";
import EditVideos from "./admin/global/EditVideos";
import AddNewVideo from "./admin/global/AddNewVideo";
import AddAcceptedImage from "../src/admin/home/AddAcceptedImage"
import Login from "./admin/Login";
import Error from "./components/global/Error"
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AdminLayout />} path="/4ebdeab6-4058-4671-942a-258434abb061">
                    <Route element={<EditLanding />} index />
                    <Route element={<EditNewsHome />} path="news-home"/>
                    <Route element={<EditPublicHome />} path="public-home"/>
                    <Route element={<EditPrivateHome />} path="private-home"/>
                    <Route element={<EditOtherHome />} path="other-home"/>
                    <Route element={<EditAccepted />} path="accepted"/>
                    <Route element={<AddAcceptedImage />} path="accepted/add"/>
                    <Route element={<EditNav />} path="nav"/>
                    <Route element={<EditFooter />} path="footer"/>
                    <Route element={<EditVideos />} path="videos"/>
                    <Route element={<AddNewVideo />} path="videos/add"/>
                    <Route element={<EditPublicPage />} path="public-page"/>
                    <Route element={<EditPublicList />} path="public-list"/>
                    <Route element={<AddPublicUni />} path="public-list/add"/>
                    <Route element={<EditPublicUni />} path="public-list/:id"/>
                    <Route element={<EditPrivatePage />} path="private-page"/ >
                    <Route element={<EditPrivateList />} path="private-list"/>
                    <Route element={<AddPrivateUni />} path="private-list/add"/>
                    <Route element={<EditPrivateUni />} path="private-list/:id"/>
                    <Route element={<EditPartialPage />} path="partial-page"/>
                    <Route element={<EditPartialList />} path="partial-list"/>
                    <Route element={<AddPartialScholar />} path="partial-list/add"/>
                    <Route element={<EditPartialScholar />} path="partial-list/:id"/>
                    <Route element={<EditNewsPage />} path="news-page"/>
                    <Route element={<EditNewsList />} path="news-list"/>
                    <Route element={<AddNews />} path="news-list/add"/>
                    <Route element={<EditApply />} path="apply"/>
                    <Route element={<EditOtherList />} path="other-services"/>
                    <Route element={<AddOtherService />} path="other-services/add"/>
                    <Route element={<EditOtherServices />} path="other-services/:id"/>
                    <Route element={<EditAgentPage />} path="agent"/>
                </Route>
                <Route element={<Login />} path="/d6d66900-6993-4ed4-b914-55dbdbae0e78"/>
                <Route path="/error" element={<Error />} />

                <Route element={<Layout />} path="/">
                    <Route element={<Home />} index />
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
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
