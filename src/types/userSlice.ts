import { Merchant } from "./merchant";


export interface IUserInterface {
    isLoading: boolean,
    user: Merchant | null,
    token: string | "",
}