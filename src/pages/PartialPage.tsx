import { Link, useLocation } from "react-router-dom"
import "./partial-page.css"
import parse from 'html-react-parser';

import { useEffect, useState } from "react"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../api/firestore"
import SideBar from "../components/global/SideBar"

interface ScholarListMap {
    body?:string;
    buttonLink?:string;
    buttonText?:string;
    hashtages?:string;
    header?:string;
    mainInfo?:string;
    priceAfter?:number;
    priceBefore?:number;
    uniName?:string;
    logoUrl?:string;
    logoName?:string;
    id:string
}
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
    imagesList?:[{[key:string]:string}]
    location?: string;
    logoName?: string;
    logoUrl?: string;
    name?: string;
    studentsNumber?: number;
    whatsLink?: string;
    id:string
}
const PartialPage = ()=>{
    const location =useLocation().pathname.split("/")[2].split("-").join(" ")
    const partialName = decodeURIComponent(location)
    const [scholar, setScholar] = useState<ScholarListMap>()
    const [uni, setUni] = useState<UniMap>()
    useEffect(() => {
        const scholarRef = collection(
            doc(collection(db, "partial"), "partialScholars"),
            "partialScholars"
        );

        const q = query(scholarRef, where("mainInfo", "==", partialName));
        const unsubscribe = onSnapshot(q, (res) => {
            const uniArr = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setScholar(uniArr[0]); // Set the scholar state
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [partialName]);

    useEffect(() => {
        if (!scholar?.uniName) return; 

        const uniListRef = collection(
            doc(collection(db, "private"), "privateUni"),
            "privateUni"
        );

        const privateQ = query(uniListRef, where("name", "==", scholar.uniName));
        const unsubscribe = onSnapshot(privateQ, (res) => {
            const uniArr = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUni(uniArr[0]);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [scholar?.uniName]);
    return(
        <div className="partial-page">
            <div className="container sub-page">
                <div className="left-section">
                    <h1 className="special-header">
                        معلومات المنحة
                    </h1>
                    <div className="main-info">
                        <div className="left">
                            <div className="logo">
                                <img src={scholar?.logoUrl} alt={scholar?.logoName} />
                            </div>
                            <div className="info">
                                <span className="partial-location">
                                    location:{uni?.location}
                                </span>
                                <span>
                                    Average fee:{uni?.fee}$
                                </span>

                                <span>
                                    Students:{uni?.studentsNumber}
                                </span>
                            </div>
                        </div>
                        <div className="right">
                                <h3>
                                    {scholar?.mainInfo}
                                </h3>
                                <Link to={`/private/${uni?.name}`} className="special-link">
                                    تعرف علي الجامعة
                                </Link>
                        </div>
                    </div>
                    <div className="body">
                    {scholar?.body && parse(scholar?.body)}
                    </div>
                    <Link className="global-btn" to={scholar?.buttonLink??""}>
                        {scholar?.buttonText}
                    </Link>
                </div>
                <div className="right-section">
                    <SideBar root="partial" filter={""} />
                </div>
            </div>
        </div>
    )
}
export default PartialPage