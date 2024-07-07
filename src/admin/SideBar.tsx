import { Link } from "react-router-dom";
import "./sidebar.css";
const SideBar = () => {
    return (
        <div className="admin-sidebar">
            <h1 className="sidebar-header">Dashboard</h1>
            <div className="sidebar-section">
                <h3 className="admin-sub-header">Home</h3>
                <div className="links">
                    <Link to={"/4ebdeab6-4058-4671-942a-258434abb061"}>Landing</Link>
                    <Link to="news-home">News</Link>
                    <Link to="public-home">Public</Link>
                    <Link to="private-home">Private</Link>
                    <Link to="other-home">Other</Link>
                    <Link to="accepted">Accepted</Link>
                </div>
            </div>
            <div className="sidebar-section">
                <h3 className="admin-sub-header">Global</h3>
                <div className="links">
                    <Link to={"nav"}>Nav</Link>
                    <Link to="footer">Footer</Link>
                    <Link to="videos">Videos</Link>
                </div>
            </div>
            <div className="sidebar-section">
                <h3 className="admin-sub-header">Public</h3>
                <div className="links">
                    <Link to={"public-page"}>Public Page</Link>
                    <Link to="public-list">Public Universities List</Link>
                </div>
            </div>
            <div className="sidebar-section">
                <h3 className="admin-sub-header">Private</h3>
                <div className="links">
                    <Link to={"private-page"}>Private Page</Link>
                    <Link to="private-list">Private Universities</Link>
                </div>
            </div>
            <div className="sidebar-section">
                <h3 className="admin-sub-header">Partial Scholar</h3>
                <div className="links">
                    <Link to={"partial-page"}>Partial Scholar Page</Link>
                    <Link to="partial-list">Partial Scholars</Link>
                </div>
            </div>
            <div className="sidebar-section">
                <h3 className="admin-sub-header">News</h3>
                <div className="links">
                    <Link to={"news-page"}>News Page</Link>
                    <Link to="news-list">News List</Link>
                </div>
            </div>
            <div className="sidebar-section">
                <h3 className="admin-sub-header">Other Sections</h3>
                <div className="links">
                    <Link to={"apply"}>Apply</Link>
                    <Link to="other-services">Other Services</Link>
                    <Link to="agent">Agent Page</Link>
                </div>
            </div>
        </div>
    );
};
export default SideBar;
