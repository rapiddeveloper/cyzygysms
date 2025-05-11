/*
Abstract: A zustand store to manage the edition of a student profile.
The profile data is stored in a structured format and can be updated by the user.
*/

import { createStore } from "zustand/vanilla";
import {
  StudentProfile,
  StudentProfileFormData,
} from "../domain/models/StudentProfile";
import StudentProfileRepository from "../repositories/StudentProfile/StudentProfileRepository";
import { RequestStatus } from "../@types/Result";

export interface StudentProfileFormStore {
  createProfileStatus: RequestStatus;

  uploadProfilePhoto: (photoURL: string) => void;
  createStudentProfile: (
    studentData: StudentProfileFormData
  ) => Promise<StudentProfile | null>;
  updateProfile: (
    studentData: StudentProfileFormData,
    profileId: string
  ) => Promise<StudentProfile | null>;
}

const createStudentProfileFormStore = (
  studentProfileRepository: StudentProfileRepository
) =>
  createStore<StudentProfileFormStore>()((set, get) => ({
    createProfileStatus: RequestStatus.Idle,
    /**
     * Uploads a profile photo for the student.
     * @param {string} photoURL - The URL of the photo to upload.
     */
    uploadProfilePhoto: (photoURL: string) => {
      // set({ photoURL });
    },

    createStudentProfile: async (
      profileDetails: StudentProfileFormData
    ): Promise<StudentProfile | null> => {
      if (get().createProfileStatus === RequestStatus.Loading) {
        return null;
      }
      set({ createProfileStatus: RequestStatus.Loading });
      const { profile, errorMsg } =
        await studentProfileRepository.createProfile(profileDetails);
      if (errorMsg) {
        console.error("Error creating profile: ", errorMsg);
        throw new Error(errorMsg);
      }
      if (profile === undefined) {
        throw new Error("Unexpected error occurred");
      }
      set({ createProfileStatus: RequestStatus.Idle });

      console.log("Profile created successfully: ", profile);
      return profile;
    },
    updateProfile: async (
      profileDetails: StudentProfileFormData,
      profileId: string
    ): Promise<StudentProfile | null> => {
      if (get().createProfileStatus === RequestStatus.Loading) {
        return null;
      }
      set({ createProfileStatus: RequestStatus.Loading });
      const { profile, errorMsg } =
        await studentProfileRepository.updateProfile(profileDetails, profileId);
      if (errorMsg) {
        console.error("Error creating profile: ", errorMsg);
        throw new Error(errorMsg);
      }
      if (profile === undefined) {
        throw new Error("Unexpected error occurred");
      }
      set({ createProfileStatus: RequestStatus.Idle });

      console.log("Profile updated successfully: ", profile);
      return profile;
    },
  }));

export default createStudentProfileFormStore;
