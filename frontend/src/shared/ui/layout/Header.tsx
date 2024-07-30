import Logo from "@/../public/logo.png";
import { DEFAULT_BORDER } from "@/shared/constants/layout/borderStyle"
import { HEADER_LINKS } from "@/shared/constants/layout/headerLinks"
import Link from "next/link"
import { useRouter } from "next/router"
import { IContact } from "./contact"
import { useEffect, useRef, useState } from 'react'
import gsap from "gsap"
import {Flip} from "gsap/dist/Flip"
import { useOutsideClick } from "@/shared/utils/useOutsideClick"
import Image from "next/image";

gsap.registerPlugin(Flip);

export const Header = ({ contacts }: { contacts: IContact }) => {
  const router = useRouter();
  const { phone } = contacts.attributes;
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const topBar = useRef<HTMLDivElement | null>(null);
  const middleBar = useRef<HTMLDivElement | null>(null);
  const bottomBar = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  
  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  useEffect(() => {
    if (menuOpen) {
      gsap.to(middleBar.current, { opacity: 0, duration: 0.1 });
      gsap.to(topBar.current, { y: 8, rotation: 45, duration: 0.2 });
      gsap.to(bottomBar.current, { y: -8, rotation: -45, duration: 0.2 });
      gsap.to([topBar.current, middleBar.current, bottomBar.current], { backgroundColor: "#000", duration: 0.2 });
      gsap.to(menuRef.current, {opacity : 1, duration : 0.5, ease : "power3.out"})
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(middleBar.current, { opacity: 1, duration: 0.1 });
      gsap.to(topBar.current, { y: 0, rotation: 0, duration: 0.2 });
      gsap.to(bottomBar.current, { y: 0, rotation: 0, duration: 0.2 });
      gsap.to([topBar.current, middleBar.current, bottomBar.current], { backgroundColor: "#fff", duration: 0.2 });
      gsap.to(menuRef.current, {opacity : 0, duration : 0.5, ease : "power3.out"})

      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useOutsideClick(() => {
    setMenuOpen(!menuOpen);
  }, [menuRef, buttonRef])

  return (
    <header className={`w-full h-[120px] border-b-[1px]  ${DEFAULT_BORDER}`}>
      <div className={`max-w-[1200px] w-full h-full mx-auto  border-x-[1px]  ${DEFAULT_BORDER} flex items-center justify-between`}>
        {/* <h1 className="ml-5 sm:text-lg md:text-xl lg:text-3xl text-white100">KERMAKAS</h1> */}
        <Image src={Logo} alt="" onClick={() => router.push("/")} className="w-20 h-20 ml-5 cursor-pointer" />
        <nav className="hidden md:flex gap-x-8">
          {HEADER_LINKS.map(link => {
            const activeStyles = "opacity-100 underline"
            const inactiveStyles = "opacity-70"
            return (
              <Link key={link.path} href={link.path}>
                <p 
                  className={`font-normal sm:text-sm md:text-md lg:text-lg text-white100 transition-all ease-linear delay-50 hover:opacity-100 hover:underline ${router.pathname === link.path ? activeStyles : inactiveStyles}`}>
                  {link.title}
                </p>
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center">
          <a 
            href={`tel:${phone}`} 
            className="underline sm:text-sm md:text-md lg:text-lg text-white100 font-bold mr-3">
            {phone}
          </a>
          <button
            ref={buttonRef}
            className={`flex md:hidden flex-col items-center justify-center w-10 h-10 space-y-1.5 rounded z-[2] ${menuOpen ? 'z-[3]' : ''}`}
            onClick={toggleMenu}
            style={{ position: 'relative' }}
          >
            <div ref={topBar} className="w-6 h-[1.6px] bg-white100"></div>
            <div ref={middleBar} className="w-6 h-[1.7px] bg-white100"></div>
            <div ref={bottomBar} className="w-6 h-[1.5px] bg-white100"></div>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div 
        ref={menuRef} 
        className="absolute right-0 top-0 h-full w-[320px] py-2 px-2 bg-gray-800 
        text-white rounded shadow-lg bg-white100 flex justify-center 
        items-center flex-col z-[2] gap-y-3 opacity-0">
          {HEADER_LINKS.map(link => {
            const activeStyles = "opacity-100 underline"
            const inactiveStyles = "opacity-70"
            return (
              <Link key={link.path} href={link.path}>
                <p 
                  className={`font-normal text-lg text-black transition-all ease-linear delay-50 hover:opacity-100 hover:underline ${router.pathname === link.path ? activeStyles : inactiveStyles}`}>
                  {link.title}
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
