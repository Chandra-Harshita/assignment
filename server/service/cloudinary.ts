import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config';
import { UploadApiResponse } from 'cloudinary';

cloudinary.config({ 
        cloud_name: config.cloud_name, 
        api_key: config.api_key, 
        api_secret: config.api_secret 
    });

export const uploadImage = (filePath:string):Promise<UploadApiResponse> => {
   const result=cloudinary.uploader.upload(filePath)
   return result
} 
export default cloudinary
