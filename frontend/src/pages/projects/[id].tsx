import { getProjectDetails } from "@/entities/project"
import { BannerProps } from "@/shared/ui/layout/Banner"
import { Calculator } from "@/widgets/calculator"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import useSWR from "swr"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import gsap from "gsap"
import { useRef } from "react"
import withLayout from "@/shared/ui/layout/withLayout"

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const ProjectDetailsWrapper = () => {
  const router = useRouter();
  const id = router.query.id;
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLParagraphElement | null>(null)
  const subTitleRef = useRef<HTMLParagraphElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const {data, isLoading} = useSWR(`/api/getProjectDetail/${id}`, () => getProjectDetails(Number(id)))

  useGSAP(() => {
    if (titleRef.current && subTitleRef.current && imageRef.current) {
      gsap.from([titleRef.current, subTitleRef.current, imageRef.current], {
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
  }, {scope : containerRef})

  if (!data && !isLoading) {
    toast.error("Ошибка сервера")
    return router.back();
  }

  if (!data) return <></>

  return <><div className="w-full py-10">
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-y-5">
      <h1 
        ref={titleRef}
        className="text-black font-bold text-[50px]">
          {data.attributes.title}
      </h1>
      <img 
        ref={imageRef}
        className="w-[90%] mx-auto"
        src={`${data.attributes.image.data.attributes.url}`} />
      <p ref={subTitleRef} className="text-black opacity-60 font-normal text-lg">
        {data.attributes.description}
        </p>
    </div>
  </div>
  <Calculator />
  </>
}
const bannerProps : BannerProps = {
  children : <></>,
  title : "",
  subTitle : "",
}
//@ts-ignore
export default withLayout(ProjectDetailsWrapper, bannerProps);