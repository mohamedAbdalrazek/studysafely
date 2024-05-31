import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";

import "./apply.css"
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
const Apply:React.FC = ()=>{
    interface ApplyMap {
        [key: string]: string;
    }
    interface paramtersMap{
        [key: string]: any;

    }
    const [applyData, setApplyData] = useState<ApplyMap>({});
    const [video, setVideo] = useState<ApplyMap>({});
    useEffect(() => {
        const docRef = doc(collection(db, "apply"), "apply");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setApplyData(date);
        });
        const videoRef = collection(doc(collection(db, "videos"), "other"), "videosList")
        const q = query(videoRef , where("domain" , "==", "apply"))
        onSnapshot(q, (res: paramtersMap): void => {
            const videos: ApplyMap[] = res.docs.map((doc:any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            
            setVideo(videos[0]);
        });
    }, []);

    return(
        <div className="apply">
            <div className="container">
                <div className="content">
                    <div className="left">
                        <ReactPlayer url={video.videoUrl} controls={true} width={"100%"} height={"auto"} />
                    </div>
                    <div className="right">
                        <h1>
                            {applyData.title}
                        </h1>
                        <p>
                            {applyData.subTitle}
                        </p>
                    </div>
                </div>
                <div className="links">
                    <Link to={"/private"}>الجامعات الخاصة</Link>
                    <Link to={"/public"}>الجامعات الحكومية</Link>
                    <Link to={"/partial"}>المنح الجزئية</Link>
                </div>
            </div>
        </div>
    )
}
export default Apply