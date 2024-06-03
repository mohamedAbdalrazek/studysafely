import VideosSlider from "./VideosSlider";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./videos-list.css";
interface VideosMap {
    [key: string]: string;
}
interface paramtersMap {
    [key: string]: any;
}
interface childrenMap {
    [key: string]: string | undefined;
}
const VideosList = (children: childrenMap) => {
    const [videos, setVideos] = useState<VideosMap[]>();
    const root:string = children.root == "public" ? "public": children.root == "private" ? "private": "other"
    useEffect(() => {
        const fetchDataHome = async () => {
            const videosRef = collection(
                doc(collection(db, "videos"), root),
                "videosList"
            );
            onSnapshot(videosRef, (res: paramtersMap): void => {
                const videosData: VideosMap[] = res.docs.map((doc: any) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setVideos(videosData);
            });
        };
        fetchDataHome();
    }, []);
    return (
        <div className="videos-list">

            {children.header&&<h1 className="special-header">{children.header}</h1>}
            <VideosSlider videosList={videos} />
            {children.more&&<Link to={"/videos"} className="more">
                {children.more}
            </Link>}

        </div>
    );
};
export default VideosList;
