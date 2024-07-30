import withLayout from "@/shared/ui/layout/withLayout"
import { Calculator } from "@/widgets/calculator"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { UIButton } from "@/shared/ui/UI-Button"
import { useRef } from "react"
import useSWR from "swr"
import { CharacteristicTable, getProductionPage, getProducts, IProduct, IProductionPage } from "@/entities/product"
import { smoothScrollToElement } from "@/shared/utils/smoothScroll"
import { InfoBlock } from "@/shared/ui/strapi/InfoBlock"
import FormatImageSrc from "@/shared/utils/imgSrcFormatter"
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

export const getServerSideProps = async () => {
  const productionPage = await getProductionPage()
  if (!productionPage) {
    return {
      redirect: {
        destination: '/no-data',
        permanent: false,
      },
    };
  }
  return {
    props: {
      productionPage
    },
  };
}

const ProductsPage = ({productionPage} : {productionPage : IProductionPage}) => {
  const {data, isLoading} = useSWR("/api/getProducts", () => getProducts())
  const bannerRefs = {
    image : useRef<HTMLImageElement | null>(null),
    container : useRef<HTMLDivElement | null>(null),
    title : useRef<HTMLHeadingElement | null>(null),
    paragraph : useRef<HTMLParagraphElement | null>(null),
    button : useRef<HTMLDivElement | null>(null)
  }

  const tableRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const {title, paragraph, button, image} = bannerRefs
    if (title.current && paragraph.current && button.current && image.current) {
      gsap.from([title.current, paragraph.current, button.current], {
        opacity: 0,
        x: -300,
        duration: .6,
        ease: "power3.out",
        delay: 0.2,
        stagger : .300,
      });
      gsap.from(image.current, {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      })
    }
  }, {scope : bannerRefs.container})

  if (!data || isLoading) return 'Loading'
  const typedProducts: Record<string, IProduct[]> = {};
  data.forEach((product) => {
    typedProducts[product.attributes.type] = []
  })
  data.forEach((product) => {
    typedProducts[product.attributes.type].push(product)
  })


  return <>
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-start py-20 min-h-[70vh]" ref={bannerRefs.container}>
        <div className="w-full items-center justify-center sm:items-start sm:justify-start sm:max-w-[50%] flex flex-col gap-y-5 px-5">
          <h1 className="font-bold text-black text-[50px]" ref={bannerRefs.title}>
            {productionPage.attributes.title}
          </h1>
          <p className="text-black opacity-50" ref={bannerRefs.paragraph}>
          {productionPage.attributes.description}
          </p>
          <div ref={bannerRefs.button}>
            <UIButton.Secondary
            onClick={() => smoothScrollToElement(tableRef, 2000)}
            className="px-10 rounded-md text-white100 
            font-medium text-xl hover:bg-opacity-0 
            hover:border-primary hover:border-[1px]
            hover:text-primary transition-all delay-50 ease-in
            ">
              Узнать подробнее
            </UIButton.Secondary>
          </div>
        </div>        
        <img 
        alt="" 
        className="hidden sm:flex sm:min-w-[50%] h-full" 
        src={FormatImageSrc(productionPage.attributes.banner.data.attributes.url)} 
        ref={bannerRefs.image}/>
      </div>
      {productionPage.attributes.blocks.map((block, i) => {
        return <InfoBlock {...block} isEven={i % 2 === 0} key={`production-info-block-${i}`}/>
      })}
    </div>
    <Calculator />
    <div className="w-full max-w-[1200px] mx-auto my-10">
      <div className="flex flex-col gap-y-5 mb-5 px-5 overflow-x-hidden" ref={tableRef}>
        {Object.keys(typedProducts).map(type => (
          <div key={`product-table-${type}`} className="w-full overflow-x-auto">
            <h1 className="text-black font-bold text-2xl text-center">{type}</h1>
            <CharacteristicTable products={typedProducts[type]}/>
          </div>
        ))}
      </div>
    </div>
  </>
}
// @ts-ignore
export default withLayout(ProductsPage, {title:"", subTitle:"", children:<></>})
