
import Accepted from "../components/home/Accepted"
import Landing from "../components/home/Landing"
import NewsHome from "../components/home/NewsHome"
import OtherHome from "../components/home/OtherHome"
import PrivateHome from "../components/home/PrivateHome"
import PublicHome from "../components/home/PublicHome"
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../api/firestore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons'
interface ApplyMap {
    [key: string]: string;
}
const Home: React.FC = ()=>{
    const [data, setData] = useState<ApplyMap>();
    useEffect(() => {
        const docRef = doc(collection(db, "home"), "global");
        getDoc(docRef).then((res): void => {
            const tempData = res.data();
            setData(tempData);
        });
    }
        ,[])
    return(
        <>
            <Landing />
            <NewsHome />
            <PublicHome />
            <PrivateHome />
            <OtherHome />
            <Accepted />
            <Link to={data?.whatsapp??""} className="whatsapp">
                <FontAwesomeIcon icon={faSquareWhatsapp} style={{color: "#6ada5f",}} />
            </Link>
            
        </>
    )
}
export default Home