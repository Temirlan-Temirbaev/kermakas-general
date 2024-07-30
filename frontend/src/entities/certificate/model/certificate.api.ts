import { client } from "@/shared/utils/api"
import { ICertificate } from "./certificate.interface"

export const getCertificates = () => {
  return client.get("certificates?populate=*").then((r : {data : {data : ICertificate[]}}) => {
    return r.data.data;
  })
}