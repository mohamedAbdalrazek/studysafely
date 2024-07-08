import { Link, useLocation } from "react-router-dom";
import "./public-page.css";
import parse from "html-react-parser";

import { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../api/firestore";
import SideBar from "../components/global/SideBar";
import ImageSlider from "../components/global/ImagesSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
interface UniMap {
    body?: string;
    fee?: number;
    fieldsHeader?: string;
    backgroundUrl?: string;
    backgroundName?: string;
    fieldsList?: {
        buttonLink: string;
        duration: number;
        fee: number;
        language: string;
        name: string;
    }[];
    imagesList?: [{ [key: string]: string }];
    location?: string;
    logoName?: string;
    logoUrl?: string;
    name?: string;
    studentsNumber?: number;
    whatsapp?: string;
    id:string
}
interface FlagsMap {
    [key: string]: string;
}
const PublicPage = () => {
    const location = useLocation().pathname.split("/")[2].split("-").join(" ");
    const [uni, setUni] = useState<UniMap>();
    const [flags, setFlags] = useState<FlagsMap>();

    useEffect(() => {
        const flagsRef = doc(collection(db, "global"), "flags");
        getDoc(flagsRef).then((res): void => {
            const date = res.data();
            setFlags(date);
        });
        const uniListRef = collection(
            doc(collection(db, "public"), "publicUni"),
            "publicUni"
        );

        const q = query(uniListRef, where("name", "==", location));
        onSnapshot(q, (res): void => {
            const uniArr = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUni(uniArr[0]);
        });
    }, [location]);
    const fieldsList = uni?.fieldsList?.map((field) => {
        return (
            <div className="field" key={field.name}>
                <h3>{field.name}</h3>
                <p className="duration">{field.duration} سنين</p>
                <div className="language">
                    {field.language == "en"
                        ? "اللغة الأنجليزية"
                        : "اللغة العربية"}
                    <img
                        src={
                            field.language == "en"
                                ? flags?.english
                                : flags?.turkish
                        }
                        alt=""
                    />
                </div>
                <p className="fee">{field.fee}$/سنة</p>
                <Link to={field.buttonLink}>قدم علي التخصص</Link>
            </div>
        );
    });
    return (
        <div className="public-page">
            <div className="container sub-page">
                <div className="left-section">
                    <h1 className="special-header">{uni?.name}</h1>
                    <div className="main-info">
                        <div className="logo">
                            <img src={uni?.logoUrl} alt={uni?.logoName} />
                        </div>
                        <div className="info">
                            <span>Location: {uni?.location}</span>
                            <span>Average fee: {uni?.fee}$</span>
                            <span>Students: {uni?.studentsNumber}</span>
                        </div>
                    </div>
                    {uni?.imagesList?.length ? (
                        <div>
                            <h3 className="special-sub-header">
                                صور من الجامعة
                            </h3>
                            <ImageSlider images={uni?.imagesList} />
                        </div>
                    ) : undefined}
                    <div className="body">{uni?.body && parse(uni?.body)}</div>
                    {uni?.fieldsList?.length ? (
                        <div className="fields">
                            <h3 className="special-sub-header">التخصصات</h3>
                            <div className="fields-list">{fieldsList}</div>
                        </div>
                    ) : undefined}
                </div>
                <div className="right-section">
                    <SideBar root="public" filter={uni?.name} />
                </div>
            </div>
            <Link to={uni?.whatsapp??""} className="whatsapp">
                <FontAwesomeIcon icon={faSquareWhatsapp} style={{color: "#6ada5f",}} />
            </Link>
        </div>
    );
};
export default PublicPage;
