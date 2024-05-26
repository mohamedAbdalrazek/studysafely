import "./news.css";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
const News: React.FC = () => {
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
    let [searchParams, setSearchParams]: [URLSearchParams, Function] =
        useSearchParams();
    const [pageData, setPageData] = useState<pageDataMap>();
    const [newsList, setNewsList] = useState<newsListMap[]>([]);
    const [pagesNumberArray, setPagesNumberArray] = useState<number[]>();
    useEffect(() => {
        const docRef = doc(collection(db, "news"), "page");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setPageData(date);
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
            let count = Math.ceil(newsData.length / pageData?.number);
            setPagesNumberArray(Array.from({ length: count }, (_, i) => i + 1));
        }),
            [];
    });
    const firstIndex = searchParams.get("page")?searchParams.get("page"):0
    const lastIndex = searchParams.get("page")?(searchParams.get("page")+ pageData?.number):pageData?.number
    const newsListElement = newsList.slice(firstIndex, lastIndex).map((news) => {
        return (
            <Link
                key={news.sortDate}
                className="news-element"
                to={`/${news.parentDomain}/${news.subDomain}`}
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
    const pagesNumbersElement = pagesNumberArray?.map((pageNumber) => {
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
            </div>
        </div>
    );
};
export default News;
