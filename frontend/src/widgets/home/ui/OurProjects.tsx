import ArrowIcon from "@/../public/icons/arrow.svg"
import { UIButton } from "@/shared/ui/UI-Button";
import { useRouter } from "next/router";
import { IProject, ProjectSlide } from "@/entities/project";
import Slider from "react-slick";
import { useRef } from "react";
export const OurProjects = ({initialData} : {initialData: IProject[]}) => {
//         <ProjectSlide key={`project-slide-${slide.id}`} {...slide} />
  const sliderRef = useRef<Slider>(null);

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
  const router = useRouter();
  return <div className="w-full bg-white100">
    <div className="w-full max-w-[1200px] h-full pb-10 pt-5 px-5 mx-auto">
      <div className="flex items-center justify-between w-full mb-10 sm:mb-20">
        <h1 className="font-bold text-4xl sm:text-[50px] text-black">
          Наши <span className="text-primary">проекты</span>
        </h1>
        <div className="flex items-center flex-row gap-x-4">
          <div onClick={() => sliderRef.current?.slickPrev()}  className="w-8 h-8 sm:w-12 sm:h-12 border-primary border-[1px] rounded-full flex items-center justify-center cursor-pointer">
            <ArrowIcon className={"w-[18px] h-[18px] rotate-180"} />
          </div>
          <div onClick={() => sliderRef.current?.slickNext()} className="w-8 h-8 sm:w-12 sm:h-12 border-primary border-[1px] rounded-full flex items-center justify-center cursor-pointer">
            <ArrowIcon className={"w-[18px] h-[18px]"}/>
          </div>
        </div>
      </div>
      <div className="slider-container w-full px-5">
          <Slider ref={sliderRef} {...settings}>
            {initialData.map((slide, i) => {
              return <ProjectSlide key={`process-slide-${slide.attributes.title}`} {...slide}/>
            })}
          </Slider>
        </div>
      <div className="w-full flex justify-end">
        <UIButton.Primary className="w-full mx-5 sm:w-[280px] sm:mr-5" onClick={() => router.push("/projects")}>
          <p className="text-white100 font-bold text-xl">
            Все проекты
          </p>
        </UIButton.Primary>
      </div>
    </div>
  </div>
}