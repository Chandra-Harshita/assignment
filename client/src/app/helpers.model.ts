export interface helpers {
  _id: string;
  name: string,
  typeOfService: string,
  profilePicturePath?: string,
  employeeCode:number
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: helpers[]|string;
}
export interface Helper {
  _id: string,
  typeOfService: string;
  organization: string;
  name: string;
  gender: string;
  phone: number;
  languages: string[];
  email?: string;
  filePath:string;
  KYCDocument: File;
  fileType: string;
  vehicleType?: string;
  vehicleNumber?:string;
  employeeCode: number;
  profilePicturePath?: string;
  profilePicture?:File;
  otherDocuments?: string[];
  createdAt: string
}


