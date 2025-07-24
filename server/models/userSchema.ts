import mongoose, { Schema, Document, Model } from 'mongoose'

export enum serviceEnum {
  MAID = 'maid',
  COOK = 'cook',
  NURSE = 'nurse',
  DRIVER = 'driver',
  PLUMBER = 'plumber',
  NEWSPAPER = 'newspaper',
  LAUNDRY = 'laundry',
}
export enum fileTypeEnum {
  ADHAAR = 'Adhaar card',
  PAN = 'PAN card',
  VOTER = 'Voter ID',
  PASSWORD = 'Passport',
}
export enum OrganizationEnum {
  ASBL = 'ASBL',
  SPRINGS = 'Springs Helpers',
}
export enum genderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others',
}
export enum vehicleTypesEnum {
  NONE = 'none',
  AUTO = 'auto',
  BIKE = 'bike',
  CAR = 'car',
}
export enum languagesEnum {
  TELUGU = 'telugu',
  ENGLISH = 'english',
  HINDI = 'hindi',
  ALL = 'all',
}

export interface IUser extends Document {
  typeOfService: string
  organization: string
  name: string
  languages: string[]
  gender: string
  phone: number
  email?: string
  vehicleType?: string
  fileType: string
  filePath: string
  employeeCode:number
  profilePicturePath?:string
  otherDocuments?:string[]
}

const userSchema: Schema = new Schema({
  typeOfService: {
    type: String,
    enum: Object.values(serviceEnum),
    required: true,
  },
  organization: {
    type: String,
    enum: Object.values(OrganizationEnum),
    required: true,
  },
  name: { type: String, trim: true, required: true },
  gender: { type: String, enum: Object.values(genderEnum), required: true },
  phone: { type: Number, required: true },
  languages: {
    type: [String],
    enum: Object.values(languagesEnum),
    required: true,
  },
  email: { type: String, trim: true },
  filePath: { type: String, required: true },
  fileType: { type: String, enum: Object.values(fileTypeEnum), required: true },
  vehicleType: { type: String, enum: Object.values(vehicleTypesEnum) },
  employeeCode:{type: Number,required:true},
  profilePicturePath:{type:String},
  otherDocuments:{type:[String]}
},{timestamps:true})

export const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema)
