import { Link, useLocation } from "react-router-dom"
import "./partial-page.css"
import parse from 'html-react-parser';

import { useEffect, useState } from "react"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../api/firestore"
import SideBar from "../components/global/SideBar"
interface paramtersMap {
    [key: string]: any;
}
interface ScholarListMap {
    body:string;
    buttonLink:string;
    buttonText:string;
    hashtages:string;
    header:string;
    mainInfo:string;
    priceAfter:number;
    priceBefore:number;
    uniName:string;
    logoUrl:string;
    logoName:string;
}
interface UniMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    fieldsList: {
        buttonLink: string;
        duration: number;
        fee: number;
        language: string;
        name: string;
    }[];
    imagesList:[{[key:string]:string}]
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsLink: string;
}
const PartialPage = ()=>{
    const location =useLocation().pathname.split("/")[2].split('+')
    const partialName = decodeURIComponent(location[0].split("-").join(" "))
    const uniName = decodeURIComponent(location[1].split("-").join(" "))
    const uniUrl = uniName.split(" ").join('-')
    console.log(partialName, uniName)
    const [scholar, setScholar] = useState<ScholarListMap>()
    const [uni, setUni] = useState<UniMap>()
    useEffect(()=>{
        const scholarRef = collection(
            doc(collection(db, "partial"), "partialScholars"),
            "partialScholars"
        );
        // console.log("منحة جامعة قادر حسن باشا لتخصص الهندسة الشاملة 4 سنين" == location)
        const q = query(scholarRef, where("mainInfo", "==", partialName));
        onSnapshot(q, (res: paramtersMap): void => {
            const uniArr: ScholarListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setScholar(uniArr[0]);
        });
        const uniListRef = collection(
            doc(collection(db, "private"), "privateUni"),
            "privateUni"
        );
        const privateQ = query(uniListRef, where("name", "==", uniName));
        onSnapshot(privateQ, (res: paramtersMap): void => {
            const uniArr: UniMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUni(uniArr[0]);
        });
    },[])
    console.log(scholar, uni)
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
                                <Link to={`/private/${uniUrl}`} className="special-link">
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