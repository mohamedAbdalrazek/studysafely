import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "./slider.css"
interface chidrenMap {
    header:string|undefined;
    linkTo:string|undefined;
    dataList:{
        [key: string]: string;
    }[]|undefined
}
//header:string, dataList:paramtersMap[], linkTo: string | undefined
const Slider = (children:chidrenMap) => {
    const dataList = children.dataList
    const header = children.header
    const linkTo = children.linkTo
    const dataListElement = dataList?.map((data, index) => {
        return (
            <SwiperSlide key={index}>
                <div className="right">
                    <h3>{data?.header}</h3>
                    <p>{data?.subHeader}</p>
                    {linkTo && (
                        <Link to={"public"} className="special-link">
                            {linkTo}
                        </Link>
                    )}
                </div>
                <div className="left">
                    <img src={data?.imageUrl} alt={data?.imageName} />
                </div>
            </SwiperSlide>
        );
    });
    return (
        
            <div className="slider">
                <h1 className="special-header">{header}</h1>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                    }}
                    // navigation={true}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {dataListElement}
                </Swiper>
            </div>
    );
};
export default Slider;
