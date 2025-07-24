export interface helpers {
  _id: string;
  name: string,
  typeOfService: string,
  profilePicturePath?: string
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: helpers[];
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
  filePath: string;
  fileType: string;
  vehicleType?: string;
  employeeCode: number;
  profilePicturePath?: string;
  otherDocuments?: string[];
  createdAt: string
}
