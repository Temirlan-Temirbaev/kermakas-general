import { IProduct } from "./product.interface";
import { client } from "@/shared/utils/api";
import { IProductionPage } from "./productionPage.interface";

export const getProducts = (limit? : number) : Promise<IProduct[]> => {
  const params = new URLSearchParams()
  if (limit) {
    params.append("pagination[start]", "0")
    params.append("pagination[limit]", String(limit))
  }
  params.append("populate", "*")
  return client.get(`products?${params}`).then((r : {data : {data : IProduct[]}}) => {
    return r.data.data;
  })
}

export const getProductionPage = () : Promise<IProductionPage> => {
  return client.get("production?populate[banner]=*&populate[blocks][populate]=*").then((r : {data : {data : IProductionPage}}) => {
    return r.data.data;
  })
}