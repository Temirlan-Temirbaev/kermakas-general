import { useState } from "react";
import { UIButton } from "../UI-Button"
import { ContactCard, IContact } from "./contact";
import { toast } from "react-toastify";
import { client } from "@/shared/utils/api";

export const Contacts = ({contacts} : {contacts : IContact}) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [mail, setMail] = useState("")
  const [message, setMessage] = useState("")

  const submitHandler = async () => {
    if (name.length === 0) return toast.error("Введите имя!")
    if (message.length === 0) return toast.error("Оставьте сообщение!")
    const phoneRegex = /^7\d{10}$/;
    console.log(phoneRegex.test(phone));
    console.log(phone);
    
    
    if (!phoneRegex.test(phone)) return toast.error("Введите корректный номер телефона в формате 7 XXX XXX XXXX")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(mail)) return toast.error("Введите корректный адрес электронной почты!");
    try {
      const data = {
        name,
        message,
        mail,
        phone: !phone.includes("+") ? `+${phone}` : phone
      }
      await client.post("applications", {data: data}).finally(() => {
        toast.success("Заявка отправлена!")
        setName("")
        setPhone("")
        setMail("")
        setMessage("")
      })
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }
 
  return <div className="w-full">
    <div className="flex flex-col items-center lg:flex-row mx-auto lg:items-start lg:justify-between w-full h-full max-w-[1200px] py-7 px-5 xl:px-0">
      <div className="w-full lg:max-w-[50%]">
        <h1 className="text-white100 font-bold text-3xl md:text-[50px] mb-[60px]">Обсудить проект</h1>
        <div className="flex flex-col gap-y-[30px]">
          <input 
          value={name}
          onChange={e => setName(e.target.value)}
          type="text" 
          className="w-full max-w-[430px] h-[50px] pl-2" 
          placeholder="Ваше имя"/>
          <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          type="text" 
          className="w-full max-w-[430px] h-[50px] pl-2" 
          placeholder="Номер телефона"/>
          <input
          value={mail}
          onChange={e => setMail(e.target.value)}
          type="text" 
          className="w-full max-w-[430px] h-[50px] pl-2" 
          placeholder="Почта"/>
          <input 
          value={message}
          onChange={e => setMessage(e.target.value)}
          type="text" 
          className="w-full max-w-[430px] h-[50px] pl-2" 
          placeholder="Сообщение"/>
          <UIButton.Secondary 
          onClick={submitHandler}
          className="hover:bg-opacity-0 hover:border-primary hover:border-[1px] delay-50 transition-all ease-linear w-full max-w-[430px]">
            <p className="text-white100 font-bold text-2xl">Оставить заявку</p>
          </UIButton.Secondary>
        </div>
      </div>
      <ContactCard contacts={contacts} />
    </div>
  </div>
}