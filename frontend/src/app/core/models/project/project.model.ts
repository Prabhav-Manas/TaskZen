export interface Project{
    _id:string,
    name:string,
    description?:string,
    status?:string,
    members?:any[],
    owners?:any,
    color:string,
    totalTasks:number,
    completedTasks:number,
    createdAt?:string,
    updatedAt?:string,
}