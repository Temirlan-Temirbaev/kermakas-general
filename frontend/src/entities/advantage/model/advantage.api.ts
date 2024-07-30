import { client } from "@/shared/utils/api"
import { IAdvantage } from "./advantage.interface"

export const getAdvantages = () => {
  return client.get("advantages?populate=*").then((r : {data: {data : IAdvantage[]}}) => {
    return r.data.data
  })
}