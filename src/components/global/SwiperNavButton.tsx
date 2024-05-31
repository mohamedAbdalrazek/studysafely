import { useEffect, useState } from 'react';
import { useSwiper } from 'swiper/react';

export const SwiperNavButtons = () => {
  const swiper = useSwiper();
  const [isEnd, setIsEnd] = useState(false)
  const [isBeginning, setIsBeginning] = useState(true)
  function handleNext(){
    swiper.slideNext()
  }
  function handlePrev(){
    swiper.slidePrev()
    
  }
  swiper.on('slideChange', function () {
    setIsEnd(swiper.isEnd)
    setIsBeginning(swiper.isBeginning)
  });
  return (
    <div className="swiper-nav-btns">
      <span className={isBeginning?'disabled':""} onClick={handlePrev } >&lt;</span>
      <span className={isEnd?'disabled':""} onClick={handleNext}>&gt;</span>
    </div>
  );
};