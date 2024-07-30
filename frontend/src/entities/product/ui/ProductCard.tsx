import { useRouter } from "next/router";
import { IProduct } from "../model";
import { UIButton } from "@/shared/ui/UI-Button";
import ArrowIcon from "@/../public/icons/arrow.svg";
import FormatImageSrc from "@/shared/utils/imgSrcFormatter";

export const ProductCard = ({ attributes, id }: IProduct) => {
  const { title, image, additional_info } = attributes;
  const url = image.data.attributes.url;
  const router = useRouter();

  // Define structured data object
  // const structuredData = {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: title,
  //   image: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
  //   description: additional_info.map(info => `${info.description}: ${info.value}`).join(", "),
  //   offers: {
  //     "@type": "Offer",
  //     priceCurrency: "KZT",
  //     price: attributes.price_per_meter
  //   }
  // };

  return (
    <div className="w-[75%] sm:w-[50%] md:w-[30%] min-h-[558px] relative bg-white100 border-2 border-gray40">
      <img src={FormatImageSrc(url)} alt="" className="w-full max-h-[220px]" />
      <div className="pl-5 py-3 pr-2 flex flex-col gap-y-2 max-h-[270px] overflow-y-auto">
        <h1 className="text-lg sm:text-xl text-wrap md:text-xl font-bold text-black">{title}</h1>
        {additional_info.map(info => (
          <p key={`product-${id}-${info.title}`} className="text-lg font-normal text-black opacity-60">
            {info.description}: {info.value}
          </p>
        ))}
      </div>
      <UIButton.Standard 
        onClick={() => router.push(`/products`)}
        className="absolute bottom-0 left-0 w-full h-[66px] border-t-2 border-gray40">
        <div className="flex gap-x-1 items-center">
          <p className="text-primary font-normal text-lg">Подробнее</p>
          <ArrowIcon className={"w-[18px] h-[18px] fill-primary -rotate-45"} />
        </div>
      </UIButton.Standard>
      
        {/* <script */}
          {/* type="application/ld+json" */}
        {/* > */}
          {/* {JSON.stringify(structuredData)} */}
        {/* </script> */}
    </div>
  );
};
