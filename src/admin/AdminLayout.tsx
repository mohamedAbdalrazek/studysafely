import { signOut } from "firebase/auth";
import SideBar from "./SideBar"
import "./admin-layout.css"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { auth } from "../api/firestore";
const AdminLayout = ()=>{
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    function handleLogout() {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/d6d66900-6993-4ed4-b914-55dbdbae0e78");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (!token) {
        return <Navigate to={"/d6d66900-6993-4ed4-b914-55dbdbae0e78"} />;
    }
    return(
        <div className="admin">

            <SideBar />
            <div className="top-bar">
                <span onClick={handleLogout}>
                    Logout
                </span>
                <Link to={"/"}>
                    Home
                </Link>
            </div>
            <div className="admin-main">
                <Outlet />
            </div>
        </div>
    )
}
export default AdminLayout