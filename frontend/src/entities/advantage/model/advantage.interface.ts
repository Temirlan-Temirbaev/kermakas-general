import { IStrapiImage } from "@/shared/interfaces/strapiImage.interface";

export interface IAdvantage {
  id: number;
  attributes: {
    title : string;
    description: string;
    icon : IStrapiImage
  }
}