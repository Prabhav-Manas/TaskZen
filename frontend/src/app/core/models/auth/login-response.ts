import { User } from "./user.model"

export interface SignInResponse {
    status:number,
    message:string,
    token:string,
    user: User;
    accessToken: string;
    // refreshToken:string
}