import { Project } from "./project.model";

export interface SingleProjectResponse{
    status:number,
    message:string,
    project:Project
}