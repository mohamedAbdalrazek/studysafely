
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./image-slider.css";

// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";

interface childrenMap {
    images: [{ [key: string]: string }] | undefined;
}
export default function ImageSlider(children: childrenMap) {
    const imagesList = children.images;
    const imagesElement = imagesList?.map((image) => {
        return (
            <SwiperSlide>
                <img src={image?.imageUrl} alt={image?.imageName} />
            </SwiperSlide>
        );
    });
    return (
        <div className="image-slider">
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                pagination={{clickable:true}}
                modules={[FreeMode, Navigation, Pagination]}
                className="swiper"
            >
                {imagesElement}
            </Swiper>
        </div>
    );
}
