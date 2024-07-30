type ImageFormat = {
  url : string
}

export interface IStrapiImage {
  data : {
    id: number;
    attributes : {
      name: string;
      url: string;
      formats : {
        large: ImageFormat;
        medium: ImageFormat;
        small: ImageFormat;
      }
    }
  }
}