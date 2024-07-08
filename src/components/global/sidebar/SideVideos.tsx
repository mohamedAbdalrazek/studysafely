import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../api/firestore";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import icon from "../../../assets/icons/play-button2.png";



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
        onSnapshot(videosRef, (res): void => {
            const data: VideosMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setVideosList(data);
        });
    }, []);
    function getRandomElements(arr: VideosMap[] | undefined) {
        if (arr === undefined) {
            return;
        }
        if (arr.length < 2) {
            return [arr[0]];
        }

        const index1 = Math.floor(Math.random() * arr.length);

        let index2;
        do {
            index2 = Math.floor(Math.random() * arr.length);
        } while (index2 === index1);

        // Return the two elements
        return [arr[index1], arr[index2]];
    }
    const videosELement = getRandomElements(videosList)?.map((video) => {
        const url:string = video.videoName.replace(/ /g, "-")

        return (
            <Link to={`/videos/${url}`} key={video.videoName}>
                <div className="video-container">
                    <ReactPlayer
                        url={video.videoUrl}
                        width={"100%"}
                        height={"500"}
                    />
                    <img src={icon} alt="" className="icon" />

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
