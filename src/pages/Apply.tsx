import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../api/firestore";
import { CSSProperties, useEffect, useState } from "react";

import "./apply.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
const Apply: React.FC = () => {
    interface ApplyMap {
        [key: string]: string|undefined;
    }
    const [applyData, setApplyData] = useState<ApplyMap|undefined>({});
    const [video, setVideo] = useState<ApplyMap>({});
    useEffect(() => {
        const docRef = doc(collection(db, "apply"), "apply");
        getDoc(docRef).then((res): void => {
            const date = res.data();
            setApplyData(date);
        });
        const videoRef = collection(
            doc(collection(db, "videos"), "allVideos"),
            "allVideos"
        );
        const q = query(videoRef, where("domain", "==", "apply"));
        onSnapshot(q, (res): void => {
            const videos: ApplyMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setVideo(videos[0]);
        });
    }, []);
    const conditionalStyle:CSSProperties = {
        width: "100%",
        textAlign: "center",
    };

    return (
        <div className="apply">
            <div className="container">
                <div className="content">

                    {video!= undefined &&<div className="left">
                        <ReactPlayer
                            url={video?.videoUrl}
                            controls={true}
                            width={"100%"}
                            height={"auto"}
                        />
                    </div>}
                    <div className="right" style={video==undefined ? conditionalStyle : {}}>
                        <h1>{applyData?.title}</h1>
                        <p>{applyData?.subTitle}</p>
                    </div>
                </div>
                <div className="links">
                    <Link to={"/private"}>الجامعات الخاصة</Link>
                    <Link to={"/public"}>الجامعات الحكومية</Link>
                    <Link to={"/partial"}>المنح الجزئية</Link>
                </div>
            </div>
            <Link to={applyData?.whatsapp??""} className="whatsapp">
                <FontAwesomeIcon icon={faSquareWhatsapp} style={{color: "#6ada5f",}} />
            </Link>

        </div>
    );
};
export default Apply;
