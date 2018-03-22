import {Document} from 'mongoose';

export interface UserModel extends Document {
  email: string;
  password: string;
  displayName: string;
  anonymous: boolean;
}

export class UserDTO {
  email: string;
  password: string;
  displayName: string;
  anonymous: boolean;
}
