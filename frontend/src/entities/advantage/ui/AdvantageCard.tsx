import FormatImageSrc from "@/shared/utils/imgSrcFormatter"
import { IAdvantage } from "../model"

export const AdvantageCard = (advantage: IAdvantage) => {
  const {title, description, icon} = advantage.attributes
  return <div 
  className="w-[90%] md:w-[45%] lg:w-[30%] h-[370px] bg-white100 border-[1px] border-gray40 rounded-xl pl-4 relative pt-14"
  >
    <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-white95 absolute top-0 left-10 -translate-y-[32px]">
      <div 
      className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-primary">
        <img 
        src={`${FormatImageSrc(icon.data.attributes.url)}`} 
        className={"w-5 h-5 fill-white100"} 
        alt={icon.data.attributes.name}/>
      </div>
    </div>
    <h1 className="text-black font-bold text-2xl">
      {title}
    </h1>
    <p className="text-black opacity-60 font-medium text-lg">
      {description}
    </p>
  </div>
}