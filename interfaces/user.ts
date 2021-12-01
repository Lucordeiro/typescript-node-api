import { Optional } from "sequelize/dist";

export default interface User{
    id?: number
    name:string,
    email: string,
    password: number
}