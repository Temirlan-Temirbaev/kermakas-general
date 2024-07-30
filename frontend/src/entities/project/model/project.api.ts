import { client } from "@/shared/utils/api"
import { IProject } from "./project.interface"

export const getProjects = () => {
  return client.get("projects?populate=*")
    .then((r: {data: {data: IProject[]}}) => {
      return r.data.data
    })
}

export const getProjectDetails = (id: number) => {
  return client.get(`projects/${id}?populate=*`)
    .then((r: {data : {data: IProject}}) => {
      return r.data.data
    })
}