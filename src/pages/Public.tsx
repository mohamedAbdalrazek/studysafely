import "./public.css"
import Slider from "../components/global/Slider";
import "./private.css";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import VideosList from "../components/global/VideosList"
import UniList from "../components/public/UniList";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
=======
>>>>>>> origin/main
const Public = ()=>{
    interface paramtersMap {
        [key: string]: any;
    }
    interface pageDatamap {
        infoList: [
            {
                [key: string]: string;
            } 
        ];
        infoHeader: string;
        listHeader: string;
        listNumber: number;
        moreVideos: string;
        videosHeader: string;
<<<<<<< HEAD
        whatsapp: string;
=======
        whatsLink: string;
>>>>>>> origin/main
    }
    const [pageData, setPageData] = useState<pageDatamap>();
    useEffect(() => {
        const docRef = doc(collection(db, "public"), "public");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setPageData(date);
        });
    }, []);
    return(
        <div className="public">
            <div className="container">
                <Slider header={pageData?.infoHeader} dataList={pageData?.infoList} linkTo={undefined} />
                <VideosList header={pageData?.videosHeader} more={pageData?.moreVideos} root="public" />
                <UniList listHeader={pageData?.listHeader} listNumber={pageData?.listNumber} />
            </div>
<<<<<<< HEAD
            <Link to={pageData?.whatsapp??""} className="whatsapp">
                <FontAwesomeIcon icon={faSquareWhatsapp} style={{color: "#6ada5f",}} />
            </Link>
=======
>>>>>>> origin/main
        </div>
    )
}
export default Public