import Logo from "@/../public/logo.png"
import { IContact } from "./contact"
import { SVGLineElementAttributes } from "react";
import TelegramIcon from "@/../public/icons/telegram.svg";
import WhatsappIcon from "@/../public/icons/whatsapp.svg";
import InstagramIcon from "@/../public/icons/instagram.svg";
import Link from "next/link";
import Image from "next/image";
type FooterLink = {
  path: string;
  Icon: (props: SVGLineElementAttributes<SVGLineElement>) => JSX.Element;
};

export const Footer = ({contacts} : {contacts : IContact}) => {
  const {telegram_link, whatsapp_link, instagram_link} = contacts.attributes
  const links: FooterLink[] = [
    {path : telegram_link, Icon : TelegramIcon},
    {path : whatsapp_link, Icon : WhatsappIcon},
    {path : instagram_link, Icon : InstagramIcon}
  ]
  return <footer className="w-full h-[90px] border-t-[1px] border-opacity-30 border-white90">
    <div className="flex w-full px-5 xl:px-0 max-w-[1200px] mx-auto h-full justify-between items-center">
      <Image src={Logo} alt="" className="w-16 h-16" />
      {/* <h1 className="text-white100 font-bold text-3xl md:text-[42px]">KERMAKAS</h1> */}
      <div className="flex flex-row items-center gap-x-5">
        {links.map(({Icon, path}, i) => {
          if (!path || path.trim().trimEnd().trimStart().length === 0) return;
          return (
          <Link href={path} key={`footer-icon-${i}`} className="w-8 h-8 md:w-[56px] md:h-[56px] bg-primary cursor-pointer rounded-full flex items-center justify-center">
            <Icon className={"w-6 h-6 md:w-8 md:h-8 "}  />
          </Link>
        )})}
      </div>
    </div>
  </footer>
}