import { Outlet } from "react-router-dom";
import Nav from "./components/global/Nav";
import Footer from "./components/global/Footer";

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
};
export default Layout;
