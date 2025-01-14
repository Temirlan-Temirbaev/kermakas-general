import { ToastifyWrapper } from "@/app/Toastify.wrapper";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <ToastifyWrapper>
      <Component {...pageProps} />
    </ToastifyWrapper>
}
