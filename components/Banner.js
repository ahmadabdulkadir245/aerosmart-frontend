import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import {BANNERS} from '../db/banner-image'
import Image from 'next/legacy/image'

const banners = BANNERS

// import required modules
import { Pagination, Navigation, Thumbs } from "swiper";

function Banner() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, []);
  return (
    <div className='w-full xl:w-[1024px] flex justify-center m-auto  mt-2 transition-all duration-700 ease-out'>
    {loading ?
    <Swiper
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Pagination, Thumbs]}
      className="mySwiper"
    >
        {banners.map(banner => (
        <SwiperSlide key={banner.id} >
            <div className='relative h-[35vh] w-[95%] m-auto rounded-md overflow-hidden'>
        {/* <img src={banner.image} alt={banner.title} className='w-full h-full rounded-md object-cover'  /> */}
        <Image src={banner.image} alt={banner.title} width={400} height={320} priority/>
        {/* <Image src={banner.image} alt={banner.title} layout='fill' objectFit='cover' priority/> */}
            </div>
      </SwiperSlide>
        ))}
    </Swiper>

  : 
  <div className='relative h-[35vh] w-[95%] m-auto rounded-md bg-gray-400 overflow-hidden animate-pulse transition-all duration-500 linear'>
  <div className='absolute h-full w-10  bg-white pulse overflow-hidden z-[40]'></div>
          <div className="relative top-[90%] flex  justify-center  space-x-3  bottom-5 ">
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
          </div>
            </div>
  }
  </div>
  )
}

export default Banner