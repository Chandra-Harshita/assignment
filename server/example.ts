import { userModel, IUser } from './models/userSchema'

export const createUser = async () => {
  const newUser: IUser = new userModel({
    typeOfService: 'maid',
    organization: 'Springs Helpers',
    name: 'vydehi',
    languages: ['telugu', 'english'],
    gender: 'female',
    phone: 9347142250,
    email: 'abc@gmail.com',
    vehicleType: 'none',
    fileType: 'Adhaar card',
    filePath: 'sdfghjkkl',
  })
  try {
    await newUser.save()
    console.log(newUser)
  } catch (e) {
    console.log(e)
  }
}
createUser()
