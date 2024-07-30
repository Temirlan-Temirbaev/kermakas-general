import { IStrapiImage } from "@/shared/interfaces/strapiImage.interface";

export interface IProject {
  id: number;
  attributes : {
    title : string;
    description: string;
    image: IStrapiImage
  }
}