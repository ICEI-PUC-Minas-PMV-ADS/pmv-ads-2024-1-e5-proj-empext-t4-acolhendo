import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

class UploadMiddleware {
    private destination: string;

    constructor(folder_path: string) {
        this.destination = path.resolve(`./uploads/${folder_path}`);
        if (!fs.existsSync(this.destination)) {
            fs.mkdirSync(this.destination, { recursive: true });
        }
    }

    private storage(): multer.StorageEngine {
        return multer.diskStorage({
            destination: (req, file: Express.Multer.File, cb: Function) => {
                cb(null, this.destination);
            },
            filename: (req, file: Express.Multer.File, cb: Function) => {
                const type = mime.extension(file.mimetype);
                const filename = `${uuidv4()}.${type}`;
                cb(null, filename);
            },
        });
    }

    private fileFilter(): multer.Options['fileFilter'] {
        return (
            req,
            file: Express.Multer.File,
            cb: FileFilterCallback
        ) => {
            const type = mime.extension(file.mimetype);
            const allowedTypes = ['png', 'jpg', 'jpeg', 'webp'];
            if (allowedTypes.includes(`${type}`)) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        };
    }

    get getConfig(): multer.Options {
        return {
            storage: this.storage(),
            fileFilter: this.fileFilter(),
        };
    }
}

export const UploadGaleria = new UploadMiddleware('gallery');
export const UploadBanner = new UploadMiddleware('banner');
