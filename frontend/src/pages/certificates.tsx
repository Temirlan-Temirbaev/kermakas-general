import { getCertificates } from "@/entities/certificate"
import { BannerProps } from "@/shared/ui/layout/Banner"
import withLayout from "@/shared/ui/layout/withLayout"
import useSWR from "swr"
import ImageViewer from 'react-simple-image-viewer';
import { useCallback, useState } from "react";
import FormatImageSrc from "@/shared/utils/imgSrcFormatter";

const Certificates = () => {
  const {data, isLoading} = useSWR("/api/getCertificates", getCertificates);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  const openImageViewer = useCallback((index : number) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentIndex(0);
    setIsViewerOpen(false);
  };
  
  if (!data || isLoading) {
    return <div>Загрузка</div>
  }

  const images = data.map((image) => {
    return FormatImageSrc(image.attributes.image.data.attributes.url)
  })
  
  return <div className="w-full">
    <div className="w-full max-w-[1200px] mx-auto min-h-[90vh] flex flex-row items-center justify-center gap-y-5 flex-wrap">
      {images.map((imageUrl, index) => {
        return <img
        key={`${imageUrl}-${index}`}
        src={imageUrl} 
        alt=""
        className="w-[400px]"
        onClick={() => openImageViewer(index)} 
        />
      })}
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentIndex}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  </div>
}

const bannerProps : BannerProps = {
  title : "",
  subTitle : "",
  children : <></>
}

export default withLayout(Certificates, bannerProps)