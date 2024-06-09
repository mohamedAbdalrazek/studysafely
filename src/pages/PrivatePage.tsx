import { Link, useLocation, Outlet } from "react-router-dom"
import "./private-page.css"
import { useEffect, useState } from "react"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../api/firestore"
import SideBar from "../components/global/SideBar"
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons"
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    whatsapp: string;
=======
    whatsLink: string;
>>>>>>> origin/main
}
interface paramtersMap {
    [key: string]: any;
}
const PrivatePage = ()=>{
    const location = useLocation().pathname.split("/")[2].split("-").join(" ")
    const [uni, setUni] = useState<UniMap>()
    useEffect(()=>{
        const uniListRef = collection(
            doc(collection(db, "private"), "privateUni"),
            "privateUni"
        );
        
        const q = query(uniListRef, where("name", "==", location));
        onSnapshot(q, (res: paramtersMap): void => {
            const uniArr: UniMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUni(uniArr[0]);
        });
    },[])
    
    return(
        <div className="private-page">
            <div className="container sub-page">
                <div className="left-section">
                    <h1 className="special-header">
                        {uni?.name}
                    </h1>
                    <div className="buttons">
                        <Link to={""}>
                            معلومات الجامعة
                        </Link>
                        <Link to={"partial"}>
                            منح الجامعة
                        </Link>
                    </div>
                    <Outlet context={[uni]} />
                    
                </div>
                <div className="right-section">
                    <SideBar root="private" filter={uni?.name} />
                </div>
            </div>
<<<<<<< HEAD
            <Link to={uni?.whatsapp??""} className="whatsapp">
                <FontAwesomeIcon icon={faSquareWhatsapp} style={{color: "#6ada5f",}} />
            </Link>
=======
>>>>>>> origin/main
        </div>
    )
}
export default PrivatePage