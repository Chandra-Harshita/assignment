import { Request, Response } from 'express'
import { IUser, userModel } from '../models/userSchema'
import { Types } from 'mongoose'
import { OrganizationEnum, serviceEnum, genderEnum, vehicleTypesEnum, fileTypeEnum, languagesEnum } from '../models/userSchema'


const validate = (req: Request, helper: Partial<IUser>): string[] => {
  const err: string[] = []
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

  return err;
}

const getResMessage = (res: Response, statuscode: number, success: boolean, message: string, data?: IUser[] | IUser | string[]): Response => {
  return res.status(statuscode).json({
    success: success,
    message: message,
    data: data ? data : "no data for this request"
  })
}

export const getAllHelpers = async (req: Request, res: Response) => {
  try {
    const helpers: IUser[] = await userModel.find().select('name typeOfService profilePicturePath')

    if (helpers.length > 0) {
      // getResMessage(res, 200, true, 'Helpers fetched', helpers)
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
      getResMessage(res, 200, true, "no data to update")
    }
    else {
      const err: string[] = validate(req, helper)
      if (err.length > 0) {
        getResMessage(res, 422, false, 'enter required and valid details to update', err)
      }
      else {
        const newHelper: IUser | null = await userModel.findByIdAndUpdate(
          userId,
          req.body,
          { new: true }
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
    // let data1 : Pick<IUser, "phone" | "email">;
    // let data : Partial<IUser> = {
    //   typeOfService: req.body.typeOfService
    // }
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
      const err: string[] = validate(req, helper)
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
