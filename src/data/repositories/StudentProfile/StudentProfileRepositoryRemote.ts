import StudentProfileRepository from "./StudentProfileRepository";
import {
  EnrollmentStatus,
  StudentProfile,
  StudentProfileFormData,
} from "../../domain/models/StudentProfile";
import SMSAPIService from "../../services/api/smsapiservice/SMSAPIService";
import { ResultType } from "../../@types/Result";

class StudentProfileRepositoryRemote extends StudentProfileRepository {
  private smsAPIService: SMSAPIService;
  constructor(smsAPIService: SMSAPIService) {
    super();
    this.smsAPIService = smsAPIService;
  }

  async createProfile(
    profileDetails: StudentProfileFormData
  ): Promise<{ profile?: StudentProfile; errorMsg?: string }> {
    const postedProfileResult = await this.smsAPIService.postProfileData(
      profileDetails
    );

    if (postedProfileResult.type === ResultType.Failure) {
      return {
        errorMsg: postedProfileResult.error.message,
      };
    }

    const uploadImageResult = await this.smsAPIService.uploadImage(
      postedProfileResult.value.studentId,
      profileDetails.file
    );
    if (uploadImageResult.type === ResultType.Failure) {
      return {
        errorMsg: uploadImageResult.error.message,
      };
    }

    const profile: StudentProfile = {
      fullname: postedProfileResult.value.name,
      email: postedProfileResult.value.email,
      enrollmentStatus: postedProfileResult.value
        .enrollment as EnrollmentStatus,
      studentId: postedProfileResult.value.studentId,
      photoURL: uploadImageResult.value, // uploaded image URL
    };
   
    return { profile };
  }

  async updateProfile(profileDetails: StudentProfileFormData, profileId: string): Promise<{profile?: StudentProfile, errorMsg?: string}> {
    
    // updates image
    const uploadImageResult = await this.smsAPIService.uploadImage(
      profileId,
      profileDetails.file
    );
    if (uploadImageResult.type === ResultType.Failure) {
      return {
        errorMsg: uploadImageResult.error.message,
      };
    }

    
    const patchedProfileResult = await this.smsAPIService.patchProfileData(
      profileDetails,
      profileId,
      uploadImageResult.value
    );

    if (patchedProfileResult.type === ResultType.Failure) {
      return {
        errorMsg: patchedProfileResult.error.message,
      };
    }

    const profile: StudentProfile = {
      fullname: patchedProfileResult.value.name,
      email: patchedProfileResult.value.email,
      enrollmentStatus: patchedProfileResult.value
        .enrollment as EnrollmentStatus,
      studentId: patchedProfileResult.value.studentId,
      photoURL: patchedProfileResult.value.photoURL,  
    };

    return {profile }
  }

  async deleteProfile(studentId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async getProfile(studentId: string): Promise<StudentProfile | null> {
    throw new Error("Method not implemented.");
  }

  async getAllProfiles(): Promise<StudentProfile[]> {
    throw new Error("Method not implemented.");
  }
}

export default StudentProfileRepositoryRemote;
