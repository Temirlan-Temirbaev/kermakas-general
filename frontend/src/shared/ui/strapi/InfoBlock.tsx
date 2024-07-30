import { IStrapiInfoBlock } from "@/shared/interfaces/strapiInfoBlock.interface"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useRef } from "react"
import FormatImageSrc from "@/shared/utils/imgSrcFormatter"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

export const InfoBlock = ({title, info, image, isEven} : IStrapiInfoBlock & {isEven : boolean}) => {
  const imageUrl = FormatImageSrc(image.data.attributes.url)
  
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const infoRef = useRef<HTMLParagraphElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const smallImageRef = useRef<HTMLImageElement | null>(null)

  useGSAP(() => {
    if (titleRef.current && infoRef.current) {
      gsap.from([titleRef.current, infoRef.current], {
        opacity: 0,
        y: 50,
        duration: .6,
        ease: "power3.out",
        delay: 0.2,
        stagger : .300,
        scrollTrigger: {
          trigger: containerRef.current,
          toggleActions: "play none none reverse",
          start : "top center",
          end : "bottom center"
        },
      });
      gsap.from([imageRef.current, smallImageRef.current], {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
            toggleActions: "play pause resume none",
            start : "top center",
            end : "bottom center"
        }
      })
    }
  }, {scope : containerRef})

  if (!isEven) {
    return <div className="flex justify-between items-start py-20 px-5 gap-x-5 min-h-[60vh]" ref={containerRef}>
    <img alt="" className="hidden md:flex min-w-[50%]" src={imageUrl} ref={imageRef}/>
    <div className="w-full flex flex-col gap-y-5 items-start md:w-1/2">
      <h1 className="font-bold text-black text-4xl" ref={titleRef}>
          {title}
      </h1>
      <img alt="" className="flex md:hidden" src={imageUrl} ref={smallImageRef}/>
      <p 
      ref={infoRef} 
      className="list-disc ml-5 text-black text-opacity-60 text-xl flex flex-col gap-y-3">
        <p     dangerouslySetInnerHTML={{__html : info.replace(/\n/g, '<br/>')}}
      ></p>
      </p>
    </div>
    </div>
  }

  return <div className="flex justify-between items-start py-20 px-5 gap-x-5" ref={containerRef}>
  <div className="w-full flex flex-col gap-y-5 items-start md:w-1/2">
    <h1 className="font-bold text-black text-4xl" ref={titleRef}>
        {title}
    </h1>
    <img alt="" className="flex md:hidden" src={imageUrl} ref={smallImageRef}/>
    <p 
    ref={infoRef} 
    className="list-disc ml-5 text-black text-opacity-60 text-xl flex flex-col gap-y-3">
      <p     dangerouslySetInnerHTML={{__html : info.replace(/\n/g, '<br/>')}}
      ></p>
    </p>
  </div>
  <img alt="" className="hidden md:flex min-w-[50%]" src={imageUrl} ref={imageRef}/>
  </div>
}