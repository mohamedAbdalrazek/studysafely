import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import "./accepted.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Zoom } from "swiper/modules";
import { register } from "swiper/element";
register();

const Accepted: React.FC = () => {

    interface acceptedHomeMap {
        acceptedList?: [
            {
                [key: string]: string;
            }
        ];
        header?: string;
    }
    const [accptedHome, setAcceptedHome] = useState<acceptedHomeMap>();
    const widthCheck = (window.innerWidth) <  768;
    useEffect(() => {
        // getting the accepted data related to the home page
        const fetchDataHome = async () => {
            const docRef = doc(collection(db, "home"), "accepted");
            await getDoc(docRef).then((res): void => {
                const date = res.data();
                setAcceptedHome(date);
            });
        };
        fetchDataHome();
    }, []);
    const acceptedElement = accptedHome?.acceptedList?.map((accepted, index) => {
        return (
            <SwiperSlide key={index}>
                <img src={accepted.imageUrl} alt={accepted.imageName} />
            </SwiperSlide>
        );
    });
    return (
        <div className="accepted-home">
            <div className="container">
                <h1 className="special-header">{accptedHome?.header}</h1>
                <div className="accepted-list">
                    <Swiper
                        zoom={true}
                        effect={!widthCheck ?"coverflow":""}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                            pauseOnMouseEnter: true,
                        }}
                        slidesPerView={!widthCheck ? 3:1}
                        grabCursor={true}
                        centeredSlides={true}
                        slideToClickedSlide={true}
                        coverflowEffect={{
                            slideShadows: true,
                            scale: 0.95,
                            rotate: 0,
                            stretch: 30,
                            depth: 100,
                            modifier: 1,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        // navigation={widthCheck}
                        modules={[EffectCoverflow, Pagination, Zoom]}
                        className="mySwiper"
                    >
                        {acceptedElement}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
export default Accepted;
