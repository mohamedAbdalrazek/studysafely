import VideosSlider from "../global/VideosSlider"
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./private-videos.css"
interface VideosMap{
    videosList:[{
        [key: string]: string;
    }]
}
interface paramtersMap{
    [key: string]: any;
}
interface childrenMap{
    [key: string]: string|undefined;
}
const PrivateVideos = (children:childrenMap)=>{
    const [videos, setVideos] = useState<VideosMap>();
    useEffect(() => {
        const fetchDataHome = async () => {
            const docRef = doc(collection(db, "videos"), "private");
            await getDoc(docRef).then((res: paramtersMap): void => {
                const date: VideosMap = res.data();
                setVideos(date);
            });
        };
        fetchDataHome();  
    }, []);
    console.log(videos?.videosList)
    return(
        <div className="private-videos">
            <h1 className="special-header">
                {children.header}
            </h1>
            <VideosSlider videosList={videos?.videosList}  />
            <Link to={"/videos"} className="more">
                {children.more}
            </Link>
        </div>
    )
}
export default PrivateVideos