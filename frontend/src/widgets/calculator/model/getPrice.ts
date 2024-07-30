import { IProduct } from "@/entities/product"

export const getPrice = (product: IProduct, square: number) => {
  return product.attributes.price_per_meter * square;
}