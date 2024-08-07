// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";
import "swiper/css/pagination";
import icon from "../../assets/icons/play-button2.png";
// import required modules
import { A11y, Navigation } from "swiper/modules";
import "./videos-slider.css";
import { SwiperNavButtons } from "./SwiperNavButton";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
// import 'swiper/swiper-bundle.min.css';
interface chidrenMap {
    videosList: { [key: string]: string }[] | undefined;
}
const VideosSlider = (children: chidrenMap) => {
    const viewWidth = window.innerWidth;
    const checkTwo = viewWidth < 992;
    const checkOne = viewWidth < 768;
    const videosPerSlide = !checkTwo ? 3 : checkOne ? 1 : 2;
    const videosListElement = children.videosList?.map((video) => {
        const url: string = video.videoName.replace(/ /g, "-");
        return (
            <SwiperSlide key={video.videoName} className="video-box">
                <Link to={`/videos/${url}`}>
                    <div className="video-container">
                        <ReactPlayer
                            url={video.videoUrl}
                            width={"100%"}
                            height={"500"}
                            clasName="video"
                        />
                        <img src={icon} alt="" className="icon" />
                    </div>
                    <h3>{video.videoName}</h3>
                    <span className="date">{video.date}</span>
                </Link>
            </SwiperSlide>
        );
    });
    return (
        <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={0}
            slidesPerView={videosPerSlide}
            className="videos-slider"
        >
            <>{videosListElement}</>
            <SwiperNavButtons />
        </Swiper>
    );
};

export default VideosSlider;
