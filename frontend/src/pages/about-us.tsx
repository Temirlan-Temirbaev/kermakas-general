import { getCompanyInfo, ICompanyInfo } from "@/entities/company-info"
import { getProducts } from "@/entities/product"
import { BannerProps } from "@/shared/ui/layout/Banner"
import withLayout from "@/shared/ui/layout/withLayout"
import { InfoBlock } from "@/shared/ui/strapi/InfoBlock"
import { UIButton } from "@/shared/ui/UI-Button"
import FormatImageSrc from "@/shared/utils/imgSrcFormatter"
import { smoothScrollAlmostToBottom } from "@/shared/utils/smoothScroll"
import { Calculator } from "@/widgets/calculator"
import { OurProducts } from "@/widgets/home"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useRouter } from "next/router"
import { useRef } from "react"
import useSWR from "swr"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

export const getServerSideProps = async () => {
  const pageInfo = await getCompanyInfo()
  if (!pageInfo) {
    return {
      redirect: {
        destination: '/no-data',
        permanent: false,
      },
    };
  }
  return {
    props: {
      pageInfo
    },
  };
}

const AboutUs = ({pageInfo} : {pageInfo : ICompanyInfo}) => {
  const {data, isLoading} = useSWR("/api/getProducts", () => getProducts())
  const router = useRouter()
  const bannerRefs = {
    containerRef : useRef<HTMLDivElement | null>(null),
    titleRef : useRef<HTMLParagraphElement | null>(null),
    subTitleRef : useRef<HTMLParagraphElement | null>(null),
    buttonRef :  useRef<HTMLDivElement | null>(null)
  }

  const productionRefs = {
    title : useRef<HTMLHeadingElement | null>(null),
    info : useRef<HTMLDivElement | null>(null),
    container : useRef<HTMLDivElement | null>(null),
    button : useRef<HTMLDivElement | null>(null),
    image : useRef<HTMLImageElement | null>(null),
    smallImage : useRef<HTMLImageElement | null>(null),
  }
  
  const productionImageUrl = FormatImageSrc(pageInfo.attributes.production_image.data.attributes.url)

  useGSAP(() => {
    const {titleRef, subTitleRef, buttonRef, containerRef} = bannerRefs
    if (titleRef.current && subTitleRef.current && buttonRef.current) {
      gsap.from([titleRef.current, subTitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
        duration: .600,
        ease: "power3.out",
        delay: 0.5,
        stagger : .100,
        scrollTrigger: {
          trigger: containerRef.current,
            toggleActions: "play pause resume reset",
            start : "top center",
            end : "bottom center"
        }
      });
    }
  }, {scope : bannerRefs.containerRef})

  useGSAP(() => {
    const {title, info, button, image, container, smallImage} = productionRefs
    if (title.current && info.current && button.current && image.current) {
      gsap.from([title.current, info.current, button.current], {
        opacity: 0,
        x: -300,
        duration: .6,
        ease: "power3.out",
        delay: 0.2,
        stagger : .300,
        scrollTrigger: {
          trigger: container.current,
            toggleActions: "play pause resume none",
            start : "top center",
            end : "bottom center"
        }
      });
      gsap.from([image.current, smallImage.current], {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: container.current,
            toggleActions: "play pause resume none",
            start : "top center",
            end : "bottom center"
        }
      })
    }
  }, {scope : productionRefs.container})
  if (!data || isLoading) return 'Loading'

  return <div className="w-full">
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-y-5 min-h-[80vh] justify-center items-center w-full p-5" ref={bannerRefs.containerRef}>
        <h1 className="text-3xl font-bold text-black text-center" ref={bannerRefs.titleRef}>
          {pageInfo.attributes.title}
        </h1>
        <p className="text-black opacity-70 px-5 text-center text-sm sm:text-base" ref={bannerRefs.subTitleRef}>
          {pageInfo.attributes.info}
        </p>
        <div ref={bannerRefs.buttonRef}>
          <UIButton.Secondary 
            onClick={() => smoothScrollAlmostToBottom(2000, 200)}
            className="px-20 transition-all delay-50 ease-linear hover:bg-opacity-90 rounded-[10px]">
              <p className="text-white100 font-bold text-base sm:text-lg">
                Связаться с нами
              </p>
          </UIButton.Secondary>
        </div>
      </div>
      <div className=" w-full py-10 flex justify-between px-5" ref={productionRefs.container}>
        <div className="flex flex-col gap-y-[15px] w-full md:w-1/2 items-center justify-center">
          <h1
          ref={productionRefs.title}
          className="text-black font-bold text-5xl mb-5">
            {pageInfo.attributes.production_title}
          </h1>
          <img alt="" className="flex md:hidden " src={productionImageUrl} ref={productionRefs.smallImage}/>
          <div 
            ref={productionRefs.info}
            
            className="text-black text-opacity-60 text-xl flex flex-col gap-y-3 mb-5">
            <p dangerouslySetInnerHTML={{ __html: pageInfo.attributes.production_info.replace(/\n/g, '<br>') }}>

            </p>
        </div>
          <div ref={productionRefs.button}>
            <UIButton.Secondary 
              onClick={() => router.push("/products")}
              className="px-20 transition-all delay-50 ease-linear hover:bg-opacity-90 rounded-[10px]">
                <p className="text-white100 font-bold text-lg">
                  Узнать подробнее
                </p>
            </UIButton.Secondary>
          </div>
        </div>
        <img alt="" className="hidden md:flex min-w-[50%] h-full" src={productionImageUrl} ref={productionRefs.image}/>
      </div>
      <div className="my-10">
        <OurProducts initialData={data} withTitle={false} />
      </div>
    </div>
    <Calculator />
    <div className="w-full max-w-[1200px] mx-auto">
      {pageInfo.attributes.blocks.map((block, i) => {
        return <InfoBlock {...block} isEven={i % 2 === 0} key={`company-info-block-${i}`}/>
      })}
    </div>
  </div>
}

const bannerProps : BannerProps = {
  title : "",
  subTitle : "",
  children : <></>
}


// @ts-ignore
export default withLayout(AboutUs, bannerProps)