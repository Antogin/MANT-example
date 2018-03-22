import {Model} from 'mongoose';
import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FileSchema} from './file.schema';
import {AddFileDTO, FileModel} from './file.models';

@Component()
export class FileService {
  constructor (@InjectModel(FileSchema) private readonly fileModel: Model<FileModel>) {
  }

  create (createFileDto: AddFileDTO): Promise<FileModel> {
    const createdCat = new this.fileModel(createFileDto);
    return createdCat.save();
  }

  deleteFiles (fileIds: string[]) {
    return this.fileModel.remove({_id: {$in: fileIds}});
  }

  findUserFiles (userId: string): Promise<FileModel[]> {
    return this.fileModel.find({'userId': userId}).exec();
  }

  markFileAsUsed (key: string, updates): Promise<FileModel> {
    return this.fileModel.findOneAndUpdate({'key': key}, {$set: updates}, {new: true}).exec();
  }
}
