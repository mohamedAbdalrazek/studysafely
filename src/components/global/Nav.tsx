import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import besideLogo from "../../assets/images/beside.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const Nav = () => {
    interface LinkMap {
        [key: string]: string;
    }
    interface paramtersMap {
        [key: string]: any;
    }
    const [links, setLinks] = useState<LinkMap>({});
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const docRef = doc(collection(db, "global"), "nav");
        getDoc(docRef).then((res: paramtersMap): void => {
            const data = res.data();
            setLinks(data);
        });
    }, []);
    return (
        <div className="nav">
            <Link className="logo" to="/">
                <img src={besideLogo} alt="" />
            </Link>
            <div className={`left ${isOpen?"open":""}`}>
                <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setIsOpen(false)} />
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
            <FontAwesomeIcon icon={faBars} className="expend" onClick={()=>setIsOpen(true)} />
        </div>
    );
};
export default Nav;
