import React from 'react';
import PhoneIcon from "@/../public/icons/phone.svg";
import MailIcon from "@/../public/icons/mail.svg";
import LocationIcon from "@/../public/icons/location.svg";
import { IContact } from "../model";

export const ContactCard = ({contacts} : {contacts : IContact}) => {
  const { phone, mail, address } = contacts.attributes;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": phone,
      "email": mail,
      "address": address,
      "contactType": "Customer Service"
    }
  };

  return (
    <div className="w-full lg:max-w-[50%]">
      <h1 className="text-white100 font-bold text-3xl mt-5 lg:mt-0 md:text-[50px] mb-7">
        Свяжитесь с <span className="text-primary">нами</span>
      </h1>
      <div className="bg-primary">
        <iframe 
          className="w-full min-h-[460px]"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5802.2427287981545!2d76.8170375!3d43.3535719!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38833fdc31d64895%3A0xf2eb946866875916!2zNzEt0Lkg0KDQsNC30YzQtdC30LQ!5e0!3m2!1sru!2skz!4v1720127857672!5m2!1sru!2skz" 
          loading="lazy"
        >
        </iframe>
        <div className="flex flex-col gap-y-[10px] pl-[30px] py-[30px]">
          <div className="flex gap-x-3 items-center">
            <PhoneIcon className="w-9 h-9 fill-white100"/>
            <p className="font-medium text-md sm:text-lg text-white100">{phone}</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <MailIcon className="w-9 h-9 fill-white100"/>
            <p className="font-medium text-md sm:text-lg text-white100">{mail}</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <LocationIcon className="w-9 h-9 fill-white100"/>
            <p className="font-medium text-md sm:text-lg text-white100">{address}</p>
          </div>
        </div>
      </div>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </div>
  );
}
