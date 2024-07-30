import { client } from "@/shared/utils/api"
import { IProductionProcess } from "./production-process.interface"

export const getProductionProcesses = () => {
  return client.get("production-processes?populate=*")
    .then((r: {data: {data: IProductionProcess[]}}) => {
      return r.data.data
    })
}