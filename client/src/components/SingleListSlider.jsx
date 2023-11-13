'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { domainUrl } from '@/utils/axios';
import Image from 'next/image';

const SingleListSlider = ({ images }) => {
  return (
    <Swiper
      slidesPerView={1}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={1000}
      modules={[Autoplay, Navigation]}
      className='mySwiper h-[60vh]'
    >
      {images.map((img, index) => (
        <SwiperSlide
          className='flex gap-3 items-center whitespace-nowrap w-full'
          key={index}
        >
          <Image
            src={`${domainUrl + img}`}
            alt='image'
            fill
            sizes='100vw'
            placeholder='blur'
            blurDataURL='/spinner.svg'
            className='object-cover'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SingleListSlider;
