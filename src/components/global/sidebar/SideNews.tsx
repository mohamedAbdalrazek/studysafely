import { collection, doc, onSnapshot } from "firebase/firestore";
import { Children, useEffect, useState } from "react";
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
            setNewsList(data);
        });
    }, []);
    function getRandomElemnts(arr:newsMap[]|undefined) {
        if(arr === undefined){
            return
        }
        if ( arr.length < 2) {
            return [arr[0]]
        }

        const index1 = Math.floor(Math.random() * arr.length);

        let index2;
        do {
            index2 = Math.floor(Math.random() * arr.length);
        } while (index2 === index1);

        // Return the two elements
        return [arr[index1], arr[index2]];
    }
    const filteredList = getRandomElemnts(newsList)
    const listElement = filteredList?.map((news)=>{
        return(
            <Link to={"/"+news.parentDomain + "/" + news.subDomain}>

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