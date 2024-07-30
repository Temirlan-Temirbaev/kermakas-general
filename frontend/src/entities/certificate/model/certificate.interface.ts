import { IStrapiImage } from "@/shared/interfaces/strapiImage.interface";

export interface ICertificate {
  id: number;
  attributes : {
    image : IStrapiImage
  }
}