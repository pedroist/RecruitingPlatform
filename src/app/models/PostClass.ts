import { IDepartment } from './IDepartment';
import { IPost } from './IPost';
import { ICountry } from './ICountry';

export class PostClass implements IPost {
    id: string;
    name?: string;
    city?: string;
    country?: ICountry;
    department?: IDepartment;
    companyName?: string;
    companyDescription?: string;
    jobDescription?: string;
    qualifications?: string;
    additionalInfo?: string;

    constructor() {

    }
}