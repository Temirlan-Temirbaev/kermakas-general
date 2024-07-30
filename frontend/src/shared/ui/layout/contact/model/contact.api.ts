import { client } from "@/shared/utils/api"
import { IContact } from "./contact.interface"

export const getContacts = () => {
  return client.get("contact").then((r : {data: {data : IContact}}) => {
    return r.data.data
  })
}