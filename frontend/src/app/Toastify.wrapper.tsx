import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastifyWrapper = ({children}: PropsWithChildren) => {
  return <>
    <ToastContainer />
    {children}
  </>
}