import { useRef, useState } from "react";
import Slider from "react-slick";
import ArrowIcon from "@/../public/icons/arrow.svg";
import { IProductionProcess } from "@/entities/production-process";
import { ProcessSlide } from "@/entities/production-process";
import styles from "./ProductionProcess.module.css"; // Import the CSS Module
export const ProductionProcess = ({ initialData }: { initialData: IProductionProcess[] }) => {
  const [activeSlideId, setActiveSlideId] = useState<number>(initialData[0].id);
  const sliderRef = useRef<Slider>(null); // Ensure useRef is typed correctly
  

  const settings = {
    infinite: true,
    speed: 500,
    arrows : false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 736,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3,
        }
      },
    ]
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[1200px] overflow-hidden h-full flex flex-col items-center mx-auto pt-6 pb-16">
        <h1 className="text-gray80 font-bold text-xl sm:text-3xl md:text-5xl lg:text-[60px] mb-10 text-center">
          Процесс <span className="border-b-[4px] border-primary pb-4">производства</span> панелей
        </h1>
        <p className="text-black text-opacity-60 text-sm sm:text-lg lg:text-xl font-bold text-center mb-10 text-center">
          Процессы производства сэндвич-панелей включают в себя методы точной резки, склеивания и отверждения для производства высококачественных панелей с превосходной теплоизоляцией, прочностью и долговечностью.
        </p>
        <div className="slider-container w-full px-5">
          <Slider ref={sliderRef} {...settings}>
            {initialData.map((slide, i) => {
              return <div key={`process-slide-${slide.attributes.title}`} className={styles.slickSlide}>
                <ProcessSlide {...slide} number={i+1} />
              </div>
            })}
          </Slider>
        </div>
        <div className="mt-20 flex gap-x-2.5 items-center">
          <ArrowIcon
            className="w-6 h-6 rotate-180 cursor-pointer"
            onClick={() => {
              // slideToPrevItem();
              sliderRef.current?.slickPrev()
              setActiveSlideId(prev => (prev === initialData[0].id ? initialData[initialData.length - 1].id : prev - 1));
            }}
          />
          {initialData.map((slide, i) => (
            <div
              key={`slide-btn-${slide.id}-${slide.attributes.title}`}
              className={`w-3 h-3 bg-gray60 cursor-pointer transition-all delay-50 ease-linear ${
                activeSlideId === slide.id ? "bg-gray80" : ""
              }`}
              onClick={() => {
                sliderRef.current?.slickGoTo(i)
                setActiveSlideId(slide.id);
              }}
            />
          ))}
          <ArrowIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              sliderRef.current?.slickNext()
              setActiveSlideId(prev => (prev === initialData[initialData.length - 1].id ? initialData[0].id : prev + 1));
            }}
          />
        </div>
      </div>
    </div>
  );
};
