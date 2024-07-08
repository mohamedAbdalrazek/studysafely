import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import underLogo from "../../assets/images/under.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
import {
    faFacebook,
    faSquareInstagram,
    faSquareWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    interface LinkMap {
        [key: string]: string|undefined;
    }
    const [links, setLinks] = useState<LinkMap|undefined>();
    const [footerData, setFooterData] = useState<LinkMap|undefined>();
    useEffect(() => {
        const docRef = doc(collection(db, "global"), "nav");
        getDoc(docRef).then((res): void => {
            const data = res.data();
            setLinks(data);
        });
        const footerRef = doc(collection(db, "global"), "footer");
        getDoc(footerRef).then((res): void => {
            const data = res.data();
            setFooterData(data);
        });
    }, []);
    return (
        <div className="footer">
            <div className="left">
                <div className="logo">
                    <img src={underLogo} alt="StudySafely" />
                </div>
                <p className="address">{footerData?.address}</p>
                <div className="social">
                    <Link to={footerData?.facebook||""}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link to={footerData?.whatsapp||""}>
                        <FontAwesomeIcon icon={faSquareWhatsapp} />
                    </Link>
                    <Link to={footerData?.instgram||""}>
                        <FontAwesomeIcon icon={faSquareInstagram} />
                    </Link>
                </div>
            </div>
            <div className="middle">
                <p>{footerData?.copyright}</p>
            </div>
            <div className="right">
                <div className="footer-nav">
                    <h3>{footerData?.header}</h3>
                    <div className="links">
                        <Link to={"/"}>{links?.home}</Link>
                        <Link to={"/private"}>{links?.private}</Link>
                        <Link to={"/public"}>{links?.public}</Link>
                        <Link to={"/news"}>{links?.news}</Link>
                        <Link to={"/partial"}>{links?.partial}</Link>
                        <Link to={"/agent"}>{links?.agent}</Link>
                    </div>
                </div>
                <Link to={"/apply"} className="global-btn">
                    {links?.button}
                </Link>
            </div>
        </div>
    );
};
export default Footer;
