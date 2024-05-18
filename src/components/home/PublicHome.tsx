import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import "./public-home.css"

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay } from "swiper/modules";
// import function to register Swiper custom elements
// import { register } from "swiper/element/bundle";
import "./news-home.css";
import { Link } from "react-router-dom";
const PublicHome:React.FC = ()=>{
    interface paramtersMap {
        [key: string]: any;
    }
    interface publicHomeMap {
        dataList : [{
            [key: string]: string;
        }]
        header:string,
        link:string
    }
    const [publicHome, setPublicHome] = useState<publicHomeMap>()
    useEffect(() => {
        // getting the new data related to the home page
        const fetchDataHome = async () => {
            const docRef = doc(collection(db, "home"), "public");
            await getDoc(docRef).then((res: paramtersMap): void => {
                const date: publicHomeMap = res.data();
                setPublicHome(date);
            });
        };
        fetchDataHome();       
    }, []);
    console.log(publicHome)
    const dataListElement = publicHome?.dataList.map((data, index)=>{
        return(
            <SwiperSlide key={index}>
                
                <div className="right">
                    <h3>
                        {data?.header}
                    </h3>
                    <p>
                        {data?.subHeader}
                    </p>
                    <Link to={"public"} className="special-link">
                        {publicHome?.link}
                    </Link>
                </div>
                <div className="left">
                    <img src={data?.imageUrl} alt={data?.imageName} />
                </div>
            </SwiperSlide>
        )
    })
    return(
        <div className="public-home">
            <div className="container">
                <h1 className="special-header">
                    {publicHome?.header}
                </h1>
                <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: true,
                            pauseOnMouseEnter:true
                        }}
                        // navigation={true}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {dataListElement}
                    </Swiper>
            </div>
        </div>
    )
}
export default PublicHome