import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../api/firestore";
import { Link } from "react-router-dom";
interface paramtersMap {
    [key: string]: any;
}
interface newsMap {
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
const SideNews = ()=>{
    const [newsList, setNewsList] = useState<newsMap[]>();
    useEffect(() => {
        const newsListRef = collection(
            doc(collection(db, "news"), "newsList"),
            "newsList"
        );
        onSnapshot(newsListRef, (res: paramtersMap): void => {
            const data:newsMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            data.sort((a, b) => {
                return b.sortDate - a.sortDate;
            });
            setNewsList(data);
        });
    }, []);
    const listElement = newsList?.slice(0,2)?.map((news)=>{
        return(
            <Link to={"/"+news.parentDomain + "/" + news.subDomain} key={news.title}>
                <div className="content">
                    <h3>
                        {news.title}
                    </h3>
                    <div className="hashtages">
                        {news.hashtages.map((hashtage)=>{return(<span className="hashtage">{hashtage}</span>)})}
                    </div>
                    <span className="date">
                        {news.date}
                    </span>
                </div>
                <div className="image">
                    <img src={news.imageUrl} alt={news.imageName} />
                </div>
            </Link>
        )
    })
    return(
        <div className="side-news">
            <h1 className="side-header">
                آخر الأخبار
            </h1>
            {listElement}
        </div>
    )
}
export default SideNews