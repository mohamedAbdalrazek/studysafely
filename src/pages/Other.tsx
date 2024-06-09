import { useEffect, useState } from "react";
import "./other.css";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import parse from "html-react-parser";

import { db } from "../api/firestore";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import ImageSlider from "../components/global/ImagesSlider";
interface paramtersMap {
    [key: string]: any;
}
type pageDataMap = {
    imagesList: [{ [key: string]: string }];
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
    console.log(location);
    const [pageData, setPageData] = useState<pageDataMap>();
    const [video, setVideo] = useState<VideoMap>({});

    useEffect(() => {
        const collectionRef = collection(db, "other");
        const q = query(collectionRef, where("name", "==", location));
        onSnapshot(q, (res: paramtersMap): void => {
            const data: pageDataMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPageData(data[0]);
        });
        const videoRef = collection(
            doc(collection(db, "videos"), "allVideos"),
            "allVideos"
        );
        const videoQ = query(videoRef, where("domain", "==", location));
        onSnapshot(videoQ, (res: paramtersMap): void => {
            const videos: VideoMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setVideo(videos[0]);
        });
    }, []);
    console.log(pageData);
    console.log(video);
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
