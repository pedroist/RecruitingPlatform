import { ICountry } from "./ICountry";
import { IDepartment } from "./IDepartment";

export interface IPost {
    id: string,
    name?: string,
    city?: string,
    country?: ICountry,
    department?: IDepartment,
    companyName?: string,
    companyDescription?: string,
    jobDescription?: string,
    qualifications?: string,
    additionalInfo?: string,
}