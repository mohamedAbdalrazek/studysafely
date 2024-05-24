// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";
import "swiper/css/pagination";

// import required modules
import { A11y, Navigation } from "swiper/modules";
import "./videos-slider.css";
import { SwiperNavButtons } from "./SwiperNavButton";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
// import 'swiper/swiper-bundle.min.css';
interface chidrenMap{
    videosList:{[key: string]: string;}[]|undefined
}
const VideosSlider = (children:chidrenMap) => {
    console.log(children)
    const videosListElement = children.videosList?.map((video)=>{

        return(
            <>
            <SwiperSlide key={video.videoName} className="video-box">
                <Link to={`/videos/${video.videoName}`}>
                    <ReactPlayer url={video.videoUrl} width={"100%"} height={"500"} />
                    <h3>
                        {video.videoName}
                    </h3>
                </Link>
            </SwiperSlide>
            <SwiperSlide key={video.videoName} className="video-box">
                <Link to={`/videos/${video.videoName}`}>
                    <ReactPlayer url={video.videoUrl} width={"100%"} height={"500"} />
                    <h3>
                        {video.videoName}
                    </h3>
                </Link>
            </SwiperSlide><SwiperSlide key={video.videoName} className="video-box">
                <Link to={`/videos/${video.videoName}`}>
                    <ReactPlayer url={video.videoUrl} width={"100%"} height={"500"} />
                    <h3>
                        {video.videoName}
                    </h3>
                </Link>
            </SwiperSlide><SwiperSlide key={video.videoName} className="video-box">
                <Link to={`/videos/${video.videoName}`}>
                    <ReactPlayer url={video.videoUrl} width={"100%"} height={"500"} />
                    <h3>
                        {video.videoName}
                    </h3>
                </Link>
            </SwiperSlide><SwiperSlide key={video.videoName} className="video-box">
                <Link to={`/videos/${video.videoName}`}>
                    <ReactPlayer url={video.videoUrl} width={"100%"} height={"500"} />
                    <h3>
                        {video.videoName}
                    </h3>
                </Link>
            </SwiperSlide><SwiperSlide key={video.videoName} className="video-box">
                <Link to={`/videos/${video.videoName}`}>
                    <ReactPlayer url={video.videoUrl} width={"100%"} height={"500"} />
                    <h3>
                        {video.videoName}
                    </h3>
                </Link>
            </SwiperSlide>
            </>
        )
    })
    return (
        <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={0 }
            slidesPerView={3}
            className="videos-slider"
        >
            {videosListElement}
            <SwiperNavButtons />
        </Swiper>
    );
};

export default VideosSlider;
