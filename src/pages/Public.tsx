import "./public.css"
import Slider from "../components/global/Slider";
import "./private.css";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import PublicVideos from "../components/public/PublicVideos"
import UniList from "../components/public/UniList";
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
        whatsLink: string;
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
                <PublicVideos header={pageData?.videosHeader} more={pageData?.moreVideos} />
                <UniList listHeader={pageData?.listHeader} listNumber={pageData?.listNumber} />
            </div>
        </div>
    )
}
export default Public