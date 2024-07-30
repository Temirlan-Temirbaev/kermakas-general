import { BannerProps } from "@/shared/ui/layout/Banner"
import withLayout from "@/shared/ui/layout/withLayout"

const ContactsPage = () => {
  return <iframe 
  className="w-full min-h-[70vh]"
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5802.2427287981545!2d76.8170375!3d43.3535719!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38833fdc31d64895%3A0xf2eb946866875916!2zNzEt0Lkg0KDQsNC30YzQtdC30LQ!5e0!3m2!1sru!2skz!4v1720127857672!5m2!1sru!2skz"  loading="lazy"
  >
  </iframe>
}

const bannerProps : BannerProps = {
  children : <></>,
  title: "",
  subTitle : ""
}

export default withLayout(ContactsPage, bannerProps)