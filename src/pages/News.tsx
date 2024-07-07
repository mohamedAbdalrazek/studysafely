import "./news.css";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SideBar from "../components/global/SideBar";
interface pageDataMap {
    number: number;
    sidebarPrivate: string;
    sidebarPublic: string;
    sidebarVideos: string;
    title: string;
}
interface paramtersMap {
    [key: string]: any;
}
interface newsListMap {
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
const News: React.FC = () => {
    const [searchParams, setSearchParams]: [URLSearchParams, Function] =
        useSearchParams();
    const [pageData, setPageData] = useState<pageDataMap>();
    const [newsList, setNewsList] = useState<newsListMap[]>([]);
    // const [pagesNumberArray, setPagesNumberArray] = useState<number[]>();
    const [pageDataNumber, setPageDataNumber] = useState(1)
    useEffect(() => {
        const docRef = doc(collection(db, "news"), "page");
        getDoc(docRef).then((res: paramtersMap): void => {
            const data = res.data();
            setPageData(data);
            setPageDataNumber(data.number)
        });
        const newsListRef = collection(
            doc(collection(db, "news"), "newsList"),
            "newsList"
        );
        onSnapshot(newsListRef, (res: paramtersMap): void => {
            const newsData: newsListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            newsData.sort((a, b) => {
                return b.sortDate - a.sortDate;
            });
            setNewsList(newsData);
        })
    },[]);
    const page = searchParams.get("page");
    const firstIndex = page ? (parseInt(page)-1)*pageDataNumber: 0;
    const lastIndex = firstIndex?(firstIndex+ pageDataNumber):pageDataNumber
    const newsListElement = newsList.slice(firstIndex, lastIndex).map((news) => {
        const url = news.parentDomain == "other"?news.subDomain : `${news.parentDomain}/${news.subDomain}`
        return (
            <Link
                key={news.sortDate}
                className="news-element"
                to={`/${url}`}
            >
                <div className="left">
                    <h3>{news?.title}</h3>
                    <div>
                        {news.hashtages.map((hashtage) => {
                            return (
                                <span key={hashtage} className="hashtage">
                                    {hashtage}
                                </span>
                            );
                        })}
                    </div>
                    <div className="date">{news.date}</div>
                </div>
                <div className="right">
                    <img src={news?.imageUrl} alt={news?.imageName} />
                </div>
            </Link>
        );
    });
    const pagesNumbersElement = Array.from({ length: Math.ceil(newsList.length / pageDataNumber) }, (_, i) => i + 1).map((pageNumber) => {
        return (
            <span
                key={pageNumber}
                onClick={() => setSearchParams({ page: pageNumber })}
            >
                {pageNumber}
            </span>
        );
    });
    return (
        <div className="news">
            <div className="container sub-page">
                <div className="left-section">
                    <h1 className="special-header">{pageData?.title}</h1>
                    <div className="news-list">{newsListElement}</div>
                    <div className="pages-number">{pagesNumbersElement}</div>
                </div>
                <div className="right-section">
                    <SideBar root="news" filter=""/>
                </div>
            </div>
        </div>
    );
};
export default News;
