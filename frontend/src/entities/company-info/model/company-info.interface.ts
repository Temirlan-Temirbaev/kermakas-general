import { IStrapiImage } from "@/shared/interfaces/strapiImage.interface";
import { IStrapiInfoBlock } from "@/shared/interfaces/strapiInfoBlock.interface";

export interface ICompanyInfo {
  id: number;
  attributes : {
    title : string;
    info : string;
    production_title : string;
    production_info : string;
    production_image : IStrapiImage;
    blocks : IStrapiInfoBlock[];
  }
}