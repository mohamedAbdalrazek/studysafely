import { Link, useLocation } from "react-router-dom";
import "./video-page.css";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot} from "firebase/firestore";
import { db } from "../api/firestore";
import icon from "../assets/icons/play-button2.png";

import SideBar from "../components/global/SideBar";
import ReactPlayer from "react-player";
interface VideoMap {
    [key: string]: string;
}
type GetRandomElementsReturnType = [VideoMap[], VideoMap];
const VideoPage = () => {
    const location = decodeURIComponent(
        useLocation().pathname.split("/")[2].split("-").join(" ")
    );
    const [videosList, setVideosList] = useState<VideoMap[]>([{}]);
    useEffect(() => {
        const videoRef = collection(
            doc(collection(db, "videos"), "allVideos"),
            "allVideos"
        );
        onSnapshot(videoRef, (res): void => {
            const videos: VideoMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setVideosList(videos);
        });
    }, []);
    function getRandomElemnts(
        arr: VideoMap[] | undefined
    ): GetRandomElementsReturnType {
        if (arr === undefined) {
            return [[], {}];
        }

        let index0 = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].videoName == location) {
                index0 = i;
            }
        }
        if (arr.length == 1) {
            return [[], arr[index0]];
        }

        let index1;
        do {
            index1 = Math.floor(Math.random() * arr.length);
        } while (index1 === index0);
        if (arr.length == 2) {
            return [[arr[index1]], arr[index0]];
        }
        let index2;
        do {
            index2 = Math.floor(Math.random() * arr.length);
        } while (index2 === index1 || index2 === index0);
        if (arr.length == 3) {
            return [[arr[index1], arr[index2]], arr[index0]];
        }
        let index3;
        do {
            index3 = Math.floor(Math.random() * arr.length);
        } while (index3 === index2 || index3 === index1 || index3 === index0);

        // Return the two elements
        return [[arr[index1], arr[index2], arr[index3]], arr[index0]];
    }
    const [latestsVideos, video] = getRandomElemnts(videosList);
    const latestsVideosElement = latestsVideos.map((latestsVideo) => {
        const url:string = latestsVideo.videoName.replace(/ /g, "-")
        return (
            <Link to={`/videos/${url}`} key={latestsVideo.videoName}>
                <div className="video-container">
                    <ReactPlayer
                        url={latestsVideo.videoUrl}
                        width={"100%"}
                        height={"500"}
                    />
                            <img src={icon} alt="" className="icon" />

                </div>
                <h3>{video.videoName}</h3>
                <span className="date">{video.date}</span>
            </Link>
        );
    });
    return (
        <div className="video-page">
            <div className="container sub-page">
                <div className="left-section">
                    <ReactPlayer
                        url={video.videoUrl}
                        controls={true}
                        // width={"100%"}
                        height={"auto"}
                        className="video"
                    />
                    <div className="info">
                        <h2>{video.videoName}</h2>
                        <p>{video.description}</p>
                        <span className="date">{video.date}</span>
                    </div>
                    <div className="buttons">
                        <Link to="../" className="global-btn">
                            كل الفديوهات
                        </Link>
                        <Link to="../" className="global-btn">
                            {video.buttonText}
                        </Link>
                    </div>

                    <div className="other-videos">
                        <h1>فيديوهات اخري</h1>
                        <div className="latest-videos">
                            {latestsVideosElement}
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <SideBar root="videos" filter="" />
                </div>
            </div>
        </div>
    );
};
export default VideoPage;
