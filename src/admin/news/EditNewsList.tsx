import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import EditListItem from "../global/EditListItem";
import { Link } from "react-router-dom";


interface NewsListMap {
    hashtages?: [string];
    date?: string;
    imageName?: string;
    imageUrl?: string;
    sortDate?: number;
    parentDomain?: string;
    subDomain?: string;
    subTitle?: string;
    title?: string;
    id:string
}
const EditNewsList = ()=>{
    const [newsList, setNewsList] = useState<NewsListMap[]>([]);
    useEffect(() => {
        const newsUniRef = collection(
            doc(collection(db, "news"), "newsList"),
            "newsList"
        );
        onSnapshot(newsUniRef, (res) => {
            const UniData: NewsListMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setNewsList(UniData);
        });
    }, []);
    const handleDelete = async (name:string) => {
        const itemToBeDeleted = newsList?.filter((news)=>news.title == name)[0]
        const docRef = doc(doc(collection(db, "news"), "newsList"),"newsList", itemToBeDeleted.id);
        await deleteDoc(docRef)
    };
    const listElement = newsList.map((item)=>{

        return(
            <EditListItem handleDelete={handleDelete} name={item.title||''} isEdit={false} domain={""} />
        )
    })
    return(
        <div className="admin-list">
            <h1 className="admin-header">
                الأخبار
            </h1>
            {listElement}
            <Link to={"add"} className="admin-button">
                Add News
            </Link>
        </div>
    )
}
export default EditNewsList