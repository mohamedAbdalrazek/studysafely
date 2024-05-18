import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import "./news-home.css";
import { Link } from "react-router-dom";

register();
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
        date:string,
        hashtages:[{[key: string]: string;}],
        imageName:string,
        imageUrl:string,
        parentDomain:string,
        sortDate:number,
        subDomain:string,
        subTitle:string,
        title:string,
        id:string
    }

    // load the date from firestore
    const [newsHomeData, setNewsHomeData] = useState<newHomeDataMap>(); //data related to home page
    const [newsList, setNewsList] = useState<newsListMap[]>([]); //list of all the news
    useEffect(() => {
        // getting the new data related to the home page
        const fetchDataHome = async () => {
            const docRef = doc(collection(db, "home"), "news");
            await getDoc(docRef).then((res: paramtersMap): void => {
                const date: newHomeDataMap = res.data();
                setNewsHomeData(date);
            });
        };
        fetchDataHome();

        //getting the news list
        const listRef = collection(
            doc(collection(db, "news"), "newsList"),
            "newsList"
        );
        onSnapshot(listRef, (res: paramtersMap): void => {
            const newsArr: newsListMap[] = res.docs.map((doc:any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            newsArr.sort((a, b) => {
                return b.sortDate - a.sortDate;
            });
            setNewsList(newsArr);
        });
    }, []);
    //returing html
    const newsListElement = newsList.slice(0,newsHomeData?.numberOfNews).map((news) => {
        return (
            <SwiperSlide key={news.sortDate.toString()}>
                <Link to={`${news.parentDomain}/${news.subDomain}`}>
                    <div className="left">
                        <img src={news.imageUrl} alt={news.imageName} />
                    </div>
                    <div className="right">
                        <h3>{news.title}</h3>
                        <p>{news.subTitle}</p>
                        <div>
                            {news.hashtages.map((hashtage: any) => {
                                return <span key={hashtage}>{hashtage}</span>;
                            })}
                        </div>
                    </div>
                </Link>
            </SwiperSlide>
        );
    });
    return (
        <div className="news-home">
            <div className="container">
                <h1 className="special-header">{newsHomeData?.title}</h1>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                    }}
                    // navigation={true}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {newsListElement}
                </Swiper>
            </div>
        </div>
    );
};
export default NewsHome;
