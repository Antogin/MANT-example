import {Time} from '@angular/common';

export class FileListModel {
  ref: string;
  name: string;
  used: boolean;
  expires: Time;
  userId: string;
}
