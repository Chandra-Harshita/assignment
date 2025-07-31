import { Request, Response } from 'express'
import { IUser, userModel } from '../models/userSchema'
import { Types } from 'mongoose'
import { OrganizationEnum, serviceEnum, genderEnum, vehicleTypesEnum, fileTypeEnum, languagesEnum } from '../models/userSchema'


const validate = (req: Request, helper: Partial<IUser>,flag:boolean): string[] => {
  const err: string[] = []
  if(flag){
     for(const key in helper ){
      console.log(key,helper[key as keyof IUser])
      if(!helper[key as keyof IUser]) err.push(`${key} is required`)
     }
  }
  else {
  if (!helper.name || !helper.name.trim()) err.push('Name is required')
  if (!helper.organization) err.push('organization is required')
  if (!helper.typeOfService) err.push('type of service is required')
  if (!helper.languages || helper.languages.length == 0)
    err.push('languages are required')
  if (!helper.phone) err.push('phone number is required')
  if (!helper.gender) err.push('gender is required')
  if (!req.files) err.push('document is required')
  if (!helper.fileType) err.push('file type is required')
  if (!Object.values(OrganizationEnum).includes(helper.organization as OrganizationEnum)) err.push('select valid organization')
  if (!Object.values(serviceEnum).includes(helper.typeOfService as serviceEnum)) err.push('select valid type of service')
  if (!Object.values(genderEnum).includes(helper.gender as genderEnum)) err.push('enter valid gender')
  if (!Object.values(fileTypeEnum).includes(helper.fileType as fileTypeEnum)) err.push('enter valid file type')
  if (
    helper.vehicleType &&
    helper.vehicleType !== vehicleTypesEnum.NONE
  ) {
    err.push('Enter a valid vehicle number (e.g. MH12AB1234)')
  }
  if (!helper.filePath) err.push('attach the KYC document')
  }
  return err;
}

const getResMessage = (res: Response, statuscode: number, success: boolean, message: string, data?: IUser[] | IUser | string[]): Response => {
  return res.status(statuscode).json({
    success: success,
    message: message,
    data:data?data:''
  })
}

export const getAllHelpers = async (req: Request, res: Response) => {
  try {
    const sortField:string=req.query.sortField as string|| 'name'
    const helpers: IUser[] = await userModel.find().select('name typeOfService profilePicturePath').sort(sortField)
    
    if (helpers.length > 0) {
      getResMessage(res, 200, true, 'Helpers fetched', helpers)
    } else {
      getResMessage(res, 404, false, 'No helpers found in collection')
    }
  } catch (e) {
    console.log(e)
    getResMessage(res, 500, false, 'Something went wrong! Please try again')
  }
}
export const getAHelper = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id
    const helper: IUser | null = await userModel.findById(userId)
    if (helper) {
      getResMessage(res, 200, true, 'Helper fetched', helper)
    } else {
      getResMessage(res, 404, false, 'No helper found with this id')
    }
  } catch (e) {
    console.log(e)
    getResMessage(res, 500, false, 'Something went wrong! Please try again')
  }
}
export const updateHelper = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id
    const helper: IUser = req.body
    if (!helper) {
      getResMessage(res, 200, false, "no details provided to update",)
    }
    else {
      if (Array.isArray(req.files)) {
        for (const file of req.files) {
          if (file.fieldname == 'profilePicture') helper.profilePicturePath = file.path
          else if (file.fieldname == 'KYCDocument') helper.filePath = file.path
          else helper.otherDocuments?.push(file.path)
        }
      }
      const err: string[] = validate(req, helper,true)
      if (err.length > 0) {
        getResMessage(res, 422, false, 'enter required and valid details to update', err)
      }
      else {
        const newHelper = await userModel.findOneAndUpdate(
          { _id: userId },
          { ...req.body },
          {
          //  upsert: true,
           new: true
          }
        )
        if (newHelper) {
          getResMessage(res, 200, true, 'Helper updated successfully', newHelper)
        }
        else {
          getResMessage(res, 404, false, 'updation failed try again with valid details')
        }
      }
    }
  } catch (e) {
    console.log(e)
    getResMessage(res, 500, false, 'Something went wrong! Please try again')
  }
}
export const deleteHelper = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id
    const helper: IUser | null = await userModel.findByIdAndDelete(userId)
    if (helper) {
      getResMessage(res, 200, true, 'Helper deleted successfully', helper)
    } else {
      getResMessage(res, 404, false, 'No helper found with this id')
    }
  } catch (e) {
    console.log(e)
    getResMessage(res, 500, false, 'Something went wrong! Please try again')
  }
}
export const addHelper = async (req: Request, res: Response) => {
  try {
    const helper: Partial<IUser> = req.body
    if (!helper) {
      getResMessage(res, 422, false, 'enter details')
    }
    else {
      helper.otherDocuments = []
      helper.employeeCode = Math.floor(Math.random() * 1000)
      //console.log(req.files)
      if (Array.isArray(req.files)) {
        for (const file of req.files) {
          if (file.fieldname == 'profilePicture') helper.profilePicturePath = file.path
          else if (file.fieldname == 'KYCDocument') helper.filePath = file.path
          else helper.otherDocuments?.push(file.path)
        }
      }
      if(helper.languages) {
        if((typeof helper.languages) === 'string') helper.languages=helper.languages.split(',')
      }
      const err: string[] = validate(req, helper,false)
      if (err.length > 0) {
        getResMessage(res, 422, false, 'enter valid details', err)
      } else {
        const newHelper: IUser = await userModel.create(helper)
        getResMessage(res, 201, true, 'Helper created successfully', newHelper)
      }
    }
  } catch (e) {
    console.log("error:  " + e)
    getResMessage(res, 500, false, 'Something went wrong! Please try again with valid details')
  }
}
export const getSpecificHelpers = async (req: Request, res: Response) => {
  try {
     const sortField:string=req.query.sortField as string|| 'name'
    const services = Array.isArray(req.query.typeOfService)
      ? req.query.typeOfService
      : req.query.typeOfService ? [req.query.typeOfService] : [];
    const organizations = Array.isArray(req.query.organization)
      ? req.query.organization
      : req.query.organization ? [req.query.organization] : [];
    const patternInName=req.query.name
      
    if (!services.length && !organizations.length && !patternInName) {
      const helpers=await userModel.find({}).select('name typeOfService profilePicturePath').sort(sortField);
      return getResMessage(res, 200, true, 'No filters selected',helpers);
    }
    
    const details = {
      ...(services.length && { typeOfService: { $in: services } }),
      ...(organizations.length && { organization: { $in: organizations } }),
      name:{$regex:patternInName,$options:"i"}
    };
    const helpers = await userModel
      .find(details)
      .select('name typeOfService profilePicturePath');

    getResMessage(res, 200, true, 'Helpers fetched successfully', helpers);
  } catch (e) {
    console.log(e);
    getResMessage(res, 500, false, 'Something went wrong! Please try again');
  }
};
