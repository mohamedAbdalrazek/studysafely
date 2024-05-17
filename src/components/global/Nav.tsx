import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import besideLogo from "../../assets/images/beside.png"
const Nav: React.FC = () => {
    interface LinkMap {
        [key: string]: string;
    }
    interface paramtersMap {
        [key: string]: any;
    }
    const [links, setLinks] = useState<LinkMap>({});
    useEffect(() => {
        const docRef = doc(collection(db, "global"), "nav");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setLinks(date);
        });
    }, []);
    return (
        <div className="nav">
            <div className="container">
                <Link className="logo" to="/"><img src={besideLogo} alt="" /></Link>
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
        </div>
    );
};
export default Nav;
