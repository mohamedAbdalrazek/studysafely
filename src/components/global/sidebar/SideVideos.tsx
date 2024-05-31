import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../api/firestore";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
interface paramtersMap {
    [key: string]: any;
}

interface VideosMap {
    [key: string]: string;
}
const SideVideos = () => {
    const [videosList, setVideosList] = useState<VideosMap[]>();
    useEffect(() => {
        const videosRef = collection(
            doc(collection(db, "videos"), "allVideos"),
            "allVideos"
        );
        onSnapshot(videosRef, (res: paramtersMap): void => {
            const data: VideosMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setVideosList(data);
        });
    }, []);
    const videosELement = videosList?.map((video) => {
        return (
            <Link to={`/videos/${video.videoName}`} key={video.videoName}>
                <div className="video-container">
                    <ReactPlayer
                        url={video.videoUrl}
                        width={"100%"}
                        height={"500"}
                    />
                </div>
                <h3>{video.videoName}</h3>
            </Link>
        );
    });
    return (
        <div className="side-videos">
            <h1 className="side-header">فيديوهات تعريفية</h1>
            {videosELement}
        </div>
    );
};
export default SideVideos;
