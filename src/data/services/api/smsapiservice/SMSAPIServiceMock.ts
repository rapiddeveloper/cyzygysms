import uuid from 'react-native-uuid';

import { FileObj, Result, ResultType } from "../../../@types/Result";
import { StudentProfileFormData } from "../../../domain/models/StudentProfile";
import { StudentProfileAPIModel } from "../model/StudentProfileAPIModel";
 import SMSAPIService from "./SMSAPIService";

class SMSAPIServiceMock extends SMSAPIService {
     async postProfileData(profileDetails: StudentProfileFormData): Promise<Result<StudentProfileAPIModel, Error>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate a successful API response
                const mockResponse: StudentProfileAPIModel = {
                    name: profileDetails.name,
                    email: profileDetails.email,
                    enrollment: profileDetails.enrollmentStatus,
                    studentId: uuid.v4(), // Generate a unique student ID
                    photoURL: '',
                    lastUpdated: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                };

                // Log the mock API request
              console.log("Mock API Request: Posting Student Profile", profileDetails);
              const result: Result<StudentProfileAPIModel, ResultType.Success> = {
                value: mockResponse,
                type: ResultType.Success,
              };
              resolve(result);
            }, 3000); // Simulate a 1-second delay
          });
    }

    async uploadImage(studentId: string, file: FileObj): Promise<Result<string, Error>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate a successful image upload
                const mockImageURL = file.uri
               
                const result: Result<string, ResultType.Success> = {
                    value: mockImageURL,
                    type: ResultType.Success,
                };
                resolve(result);
            }, 3000); // Simulate a 1-second delay
        });
    }

    async patchProfileData(profileDetails: StudentProfileFormData, profileId: string, photoURL: string): Promise<Result<StudentProfileAPIModel, Error>> {
      return new Promise((resolve) => {
          setTimeout(() => {
              // Simulate a successful API response
              const mockResponse: StudentProfileAPIModel = {
                  name: profileDetails.name,
                  email: profileDetails.email,
                  enrollment: profileDetails.enrollmentStatus,
                  studentId: profileId, // Generate a unique student ID
                  photoURL: photoURL,
                  lastUpdated: new Date().toISOString(),
                  createdAt: new Date().toISOString(),
              };

              // Log the mock API request
            console.log("Mock API Request: Updating Student Profile", profileDetails);
            const result: Result<StudentProfileAPIModel, ResultType.Success> = {
              value: mockResponse,
              type: ResultType.Success,
            };
            resolve(result);
          }, 3000); // Simulate a 1-second delay
        });
  }

}

export default SMSAPIServiceMock;