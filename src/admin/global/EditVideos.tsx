import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import EditListItem from "./EditListItem";
import { Link } from "react-router-dom";

interface paramtersMap {
    [key: string]: any;
}
interface VideoListMap {
    [key: string]: string;
}
const EditVideos = ()=>{
    const [videoList, setVideoList] = useState<VideoListMap[]>()
    
    const handleDelete = async (name:string) => {
        const itemToBeDeleted = videoList?.filter((video)=>video.videoName == name)[0]
        const docRef = doc(doc(collection(db, "videos"), "allVideos"),"allVideos", itemToBeDeleted?.id);
        await deleteDoc(docRef)
    };
    
    useEffect(() => {
        const newsUniRef = collection(
            doc(collection(db, "videos"), "allVideos"),
            "allVideos"
        );
        onSnapshot(newsUniRef, (res: paramtersMap): void => {
            const videosData: VideoListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setVideoList(videosData);
        });
    }, []);
    const listElement = videoList?.map((item)=>{
        const url:string = item.videoName.replace(/ /g, "-")

        return(
            <EditListItem name={item.videoName} isEdit={false} domain={url} handleDelete = {handleDelete} />
        )
    })
    return(
        <div className="admin-list">
            <h1 className="admin-header">
                الفيديوهات
            </h1>
            {listElement}
            <Link to={"add"} className="admin-button">
                Add Video
            </Link>
        </div>
    )
}
export default EditVideos