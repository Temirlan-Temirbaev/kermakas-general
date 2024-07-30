import { AdditionalInfo } from "@/shared/interfaces/strapiComponents.interface";
import { IStrapiImage } from "@/shared/interfaces/strapiImage.interface";

export interface IProduct {
  id: number;
  attributes : {
    title: string;
    price_per_meter : number;
    image: IStrapiImage;
    type: string;
    additional_info: AdditionalInfo[];
  }
}