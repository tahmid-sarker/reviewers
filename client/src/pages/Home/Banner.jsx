import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { motion } from "motion/react"

const Banner = () => {
  const swiperRef = useRef();

  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/hRWkLW0s/Banner1.jpg",
      heading: "Discover Trusted Services",
      subtext: "Find reliable services reviewed by real people."
    },
    {
      id: 2,
      image: "https://i.ibb.co/DH9jxyg8/Banner2.jpg",
      heading: "Share Your Experience",
      subtext: "Help others choose better by sharing your reviews."
    },
    {
      id: 3,
      image: "https://i.ibb.co/QjrP1ydh/Banner3.jpg",
      heading: "Grow Your Business",
      subtext: "List your services and build trust through genuine reviews."
    }
  ];

  return (
    <div className="w-11/12 mx-auto flex justify-center items-center gap-3 mt-5">
      <button onClick={() => swiperRef.current?.slidePrev()}>
        <IoIosArrowDropleft className="text-primary bg-white shadow-lg rounded-full w-10 h-10 hover:scale-110 transition cursor-pointer" />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 }
        }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <img src={slide.image} alt={slide.heading} className="w-full h-full object-cover blur-sm" />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4"
              >
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.heading}</h2>
                <p className="text-base md:text-lg">{slide.subtext}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button onClick={() => swiperRef.current?.slideNext()}>
        <IoIosArrowDropright className="text-primary bg-white shadow-lg rounded-full w-10 h-10 hover:scale-110 transition cursor-pointer" />
      </button>
    </div>
  );
};

export default Banner;