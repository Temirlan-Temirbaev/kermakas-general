import { IStrapiImage } from "@/shared/interfaces/strapiImage.interface";

export interface IProductionProcess {
  id: number;
  attributes: {
    title: string;
    image: IStrapiImage;
  }
}