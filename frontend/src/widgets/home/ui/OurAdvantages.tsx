import useSWR from "swr"
import { AdvantageCard, getAdvantages } from "@/entities/advantage"

export const OurAdvantages = () => {
  const {data} = useSWR("/api/getAdvantages", getAdvantages)
  return <div className="w-full  bg-white95 pt-5 pb-10">
    <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
      <div className="w-full flex justify-start mb-10">
        <h1 className={"font-bold text-3xl ml-2 sm:text-4xl md:text-[50px] text-black"}>
          Почему выбирают <span className={"text-primary"}>нашу компанию</span>
        </h1>
      </div>
      <div className="w-full justify-center flex gap-[30px] gap-y-8 flex-wrap mx-auto">
        {data?.map(advantage => {
          return <AdvantageCard key={`advantage-${advantage.id}`} {...advantage} />
        })}
      </div>
    </div>
  </div>
}