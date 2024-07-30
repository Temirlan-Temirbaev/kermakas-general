import { IStrapiImage } from "@/shared/interfaces/strapiImage.interface";
import { IStrapiInfoBlock } from "@/shared/interfaces/strapiInfoBlock.interface";

export interface IProductionPage {
  id : number;
  attributes : {
    title : string;
    description : string;
    banner : IStrapiImage;
    blocks : IStrapiInfoBlock[];
  }
}