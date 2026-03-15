import { User } from "./user.model";

export interface LogInResponse{
    status:number,
    message:string,
    token:string,
    user:User
}