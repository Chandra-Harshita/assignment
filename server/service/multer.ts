import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    console.log(req)
    if (file.fieldname == 'profilePicture') {
      cb(null, 'uploads/profilePhotos/');
    } else if (file.fieldname == 'KYCDocument' || file.fieldname == 'otherDocuments') {
      cb(null, 'uploads/documents/');
    } else {
      cb(new Error('Unsupported file type'), '');
    }
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({ storage });