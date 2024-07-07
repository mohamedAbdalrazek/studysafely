import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import EditListItem from "../global/EditListItem";
import { Link } from "react-router-dom";

interface paramtersMap {
    [key: string]: any;
}
interface NewsListMap {
    hashtages: [string];
    date: string;
    imageName: string;
    imageUrl: string;
    sortDate: number;
    parentDomain: string;
    subDomain: string;
    subTitle: string;
    title: string;
}
const EditNewsList = ()=>{
    const [partialList, setPartialList] = useState<NewsListMap[]>([]);
    useEffect(() => {
        const newsUniRef = collection(
            doc(collection(db, "news"), "newsList"),
            "newsList"
        );
        onSnapshot(newsUniRef, (res: paramtersMap): void => {
            const UniData: NewsListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPartialList(UniData);
        });
    }, []);
    const listElement = partialList.map((item)=>{

        return(
            <EditListItem name={item.title} isEdit={false} domain={""} />
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