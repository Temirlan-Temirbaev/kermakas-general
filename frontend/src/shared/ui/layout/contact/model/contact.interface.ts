export interface IContact {
  id: number;
  attributes : {
    address: string;
    mail: string;
    phone: string;
    latitude: number;
    longitude: number;
    telegram_link: string;
    instagram_link: string;
    whatsapp_link: string;
  }
}