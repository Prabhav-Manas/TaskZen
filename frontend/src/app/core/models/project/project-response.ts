import { Project } from "./project.model";

export interface ProjectResponse{
    status:number,
    message:string,
    project:Project[]
}