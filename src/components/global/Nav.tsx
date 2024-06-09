import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import besideLogo from "../../assets/images/beside.png";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const Nav = () => {
=======
const Nav: React.FC = () => {
>>>>>>> origin/main
    interface LinkMap {
        [key: string]: string;
    }
    interface paramtersMap {
        [key: string]: any;
    }
    const [links, setLinks] = useState<LinkMap>({});
<<<<<<< HEAD
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const docRef = doc(collection(db, "global"), "nav");
        getDoc(docRef).then((res: paramtersMap): void => {
            const data = res.data();
            setLinks(data);
=======
    useEffect(() => {
        const docRef = doc(collection(db, "global"), "nav");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setLinks(date);
>>>>>>> origin/main
        });
    }, []);
    return (
        <div className="nav">
<<<<<<< HEAD
            <Link className="logo" to="/">
                <img src={besideLogo} alt="" />
            </Link>
            <div className={`left ${isOpen?"open":""}`}>
                <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setIsOpen(false)} />
=======
            <div className="container">
                <Link className="logo" to="/">
                    <img src={besideLogo} alt="" />
                </Link>
>>>>>>> origin/main
                <div className="links">
                    <Link to="/">{links.home}</Link>
                    <Link to="private">{links.private}</Link>
                    <Link to="public">{links.public}</Link>
                    <Link to="news">{links.news}</Link>
                    <Link to="partial">{links.partial}</Link>
                    <Link to="videos">{links.videos}</Link>
                    <Link to="agent">{links.agent}</Link>
                </div>

                <div>
                    <Link to="apply">
                        <button className="global-btn">{links.button}</button>
                    </Link>
                </div>
            </div>
<<<<<<< HEAD
            <FontAwesomeIcon icon={faBars} className="expend" onClick={()=>setIsOpen(true)} />
=======
>>>>>>> origin/main
        </div>
    );
};
export default Nav;
