import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
    name: String,
    used: Boolean,
    expires: String,
    userId: String,
    key: String,
    id: String,
    link: String,
    dlTime: String,
});
