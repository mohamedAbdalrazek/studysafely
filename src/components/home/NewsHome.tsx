import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./news-home.css";

const NewsHome: React.FC = () => {
    // type script interfaces
    interface newHomeDataMap {
        numberOfNews: number;
        title: string;
    }
    interface paramtersMap {
        [key: string]: any;
    }
    interface newsListMap {
        [key: string]: any;
    }

    // load the date from firestore
    const [newsHomeData, setNewsHomeData] = useState<newHomeDataMap>(); //data related to home page
    const [newsList, setNewsList] = useState<newsListMap[]>([{}]); //list of all the news
    useEffect(() => {
        // getting the new data related to the home page
        const docRef = doc(collection(db, "home"), "news");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date:newHomeDataMap = res.data();
            setNewsHomeData(date);
        });
        //getting the news list
        const listRef = collection(
            doc(collection(db, "news"), "newsList"),
            "newsList"
        );
        onSnapshot(listRef, (res: paramtersMap): void => {
            const newsArr:newsListMap[] = res.docs.map((doc: newsListMap) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setNewsList(newsArr)
        });
    }, []);

    //returing html
    return (
        <div className="news-home">
            <div className="container">
                <h1 className="special-header">{newsHomeData?.title}</h1>
            </div>
        </div>
    );
};
export default NewsHome;
