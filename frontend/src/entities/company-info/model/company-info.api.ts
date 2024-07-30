import { client } from "@/shared/utils/api"
import { ICompanyInfo } from "./company-info.interface"

export const getCompanyInfo = () => {
  return client.get("company-info?populate[production_image]=*&populate[blocks][populate]=*")
    .then((r : {data : {data : ICompanyInfo}}) => {
      return r.data.data;
    })
}