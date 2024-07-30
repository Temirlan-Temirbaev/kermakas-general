import { IProduct, ProductCard } from "@/entities/product"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

export const OurProducts = ({initialData, withTitle = true} : {initialData: IProduct[], withTitle? : boolean}) => {
  // const {data, isLoading} = useSWR("/api/getProducts/limit=3", () => getProducts(3))
  const containerRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  useGSAP(() => {
    if (listRef.current) {
      gsap.from(listRef.current, {
        opacity: 0,
        y: 50,
        duration: .600,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, {scope : containerRef})

  // if (!data || isLoading) return <div>Загрузка...</div>
  return <div className="w-full bg-white95" ref={containerRef}>
    <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col items-center pt-[30px]">
      {withTitle && <h1 className="text-4xl  md:text-[60px] font-bold text-black mb-10">Наша <span className="text-primary">продукция</span></h1>      }
      <div className="flex flex-row items-center justify-center gap-5 flex-wrap" ref={listRef}>
        {initialData.map(product => {
          return <ProductCard key={`product-card-${product.id}`} {...product} />
        })}
      </div>
    </div>
  </div>
}