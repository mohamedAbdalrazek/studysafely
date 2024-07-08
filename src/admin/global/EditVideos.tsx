import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import EditListItem from "./EditListItem";
import { Link } from "react-router-dom";

interface Video {
    [key: string]: string;
}

const EditVideos = () => {
    const [videoList, setVideoList] = useState<Video[]>([]);

    const handleDelete = async (name: string) => {
        try {
            const itemToBeDeleted = videoList?.find((video) => video.videoName === name);
            if (itemToBeDeleted) {
                const docRef = doc(collection(db, "videos"), itemToBeDeleted.id);
                await deleteDoc(docRef);
            } else {
                console.error(`Video with name "${name}" not found in videoList.`);
            }
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    useEffect(() => {
        const videosRef = collection(db, "videos");
        const unsubscribe = onSnapshot(videosRef, (snapshot) => {
            const videosData: Video[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVideoList(videosData);
        });

        // Clean up listener on unmount or cleanup
        return () => unsubscribe();
    }, []);

    const listElement = videoList.map((item) => (
        <EditListItem key={item.id} name={item.videoName} isEdit={false} domain={item.videoName} handleDelete={handleDelete} />
    ));

    return (
        <div className="admin-list">
            <h1 className="admin-header">الفيديوهات</h1>
            {listElement}
            <Link to="add" className="admin-button">
                Add Video
            </Link>
        </div>
    );
};

export default EditVideos;
