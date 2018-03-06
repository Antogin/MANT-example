import { Document } from 'mongoose';

export interface FileModel extends Document {
    name: string;
    used: boolean;
    expires: string;
    userId: string;
    key: string;
    id: string;
    link: string;
    dlTime: string;
}

export class AddFileDTO {
    name: string;
    used: boolean;
    expires: string;
    userId: string;
    key: string;
    id: string;
    link: string;
    dlTime: string;
}
