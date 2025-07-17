import { Request, Response } from 'express'
import { IUser, userModel } from '../models/userSchema'
import { Types } from 'mongoose'

export const getAllHelpers = async (req: Request, res: Response) => {
  try {
    const helpers: IUser[] = await userModel.find({})

    if (helpers.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Helpers fetched',
        data: helpers,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'No helpers found in collection',
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    })
  }
}
export const getAHelper = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id
    const helper: IUser | null = await userModel.findById(userId)
    if (helper) {
      res.status(200).json({
        status: true,
        message: 'Helper fetched',
        data: helper,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'No helper found with this id',
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    })
  }
}
export const updateHelper = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id
    const helper: IUser | null = await userModel.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    )
    if (helper) {
      res.status(200).json({
        status: true,
        message: 'Helper updated successfully',
        data: helper,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'updation failed try again with valid details',
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    })
  }
}
export const deleteHelper = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id
    const helper: IUser | null = await userModel.findByIdAndDelete(userId)
    if (helper) {
      res.status(200).json({
        status: true,
        message: 'Helper deleted successfully',
        data: helper,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'No helper found with this id',
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    })
  }
}
export const addHelper = async (req: Request, res: Response) => {
  try {
    const helper: IUser = req.body
    const arr: string[] = []
    if (!helper.name || !helper.name.trim()) arr.push('Name is required')
    if (!helper.organization) arr.push('organization is required')
    if (!helper.typeOfService) arr.push('type of service is required')
    if (!helper.languages || helper.languages.length == 0)
      arr.push('languages are required')
    if (!helper.phone) arr.push('phone number is required')
    if (!helper.gender) arr.push('gender is required')
    if (!helper.filePath) arr.push('file is required')
    if (!helper.fileType) arr.push('file type is required')
    if (arr.length > 0) {
      res.status(400).json({
        success: false,
        message: arr,
      })
    } else {
      const newHelper: IUser = await userModel.create(helper)
      res.status(201).json({
        success: true,
        message: 'Helper created successfully',
        data: newHelper,
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again with valid details',
    })
  }
}
