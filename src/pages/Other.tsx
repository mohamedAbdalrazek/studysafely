import { useEffect, useState } from "react";
import "./other.css";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import parse from "html-react-parser";

import { db } from "../api/firestore";
import { Navigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import ImageSlider from "../components/global/ImagesSlider";

type pageDataMap = {
    imagesList?: [{ [key: string]: string }];
} & {
    [key: string]: string;
};
interface VideoMap {
    [key: string]: string;
}
const Other = () => {
    const location = decodeURIComponent(
        useLocation().pathname.split("/")[1].split("-").join(" ")
    );
    const [pageData, setPageData] = useState<pageDataMap>();
    const [video, setVideo] = useState<VideoMap>({});
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        const collectionRef = collection(db, "other");
        const q = query(collectionRef, where("name", "==", location));
        
        onSnapshot(q, (res): void => {
            const data = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPageData(data[0]);
            if (!data[0]) {
                setNotFound(true);
            }
        });
        const videoRef = collection(
            doc(collection(db, "videos"), "allVideos"),
            "allVideos"
        );
        const videoQ = query(videoRef, where("domain", "==", location));
        onSnapshot(videoQ, (res): void => {
            const videos: VideoMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setVideo(videos[0]);
        });

    }, [location]);
    if (notFound) {
        return <Navigate to="/error" />;
    }
    return (
        <div className="other">
            <div className="container">
                <h1 className="special-header">{pageData?.name}</h1>
                <ReactPlayer
                    url={video?.videoUrl}
                    controls={true}
                    height={"auto"}
                    className="video"
                />
                <div className="body">{pageData?.body && parse(pageData?.body)}</div>

                <ImageSlider images={pageData?.imagesList} />
            </div>
        </div>
    );
};
export default Other;
