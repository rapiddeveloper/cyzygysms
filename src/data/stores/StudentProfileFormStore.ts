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

export interface StudentProfileFormStore {
  uploadProfilePhoto: (photoURL: string) => void;
  createStudentProfile: (studentData: StudentProfileFormData) => Promise<StudentProfile>;
}

const createStudentProfileFormStore = (
  studentProfileRepository: StudentProfileRepository
) =>
  createStore<StudentProfileFormStore>()((set, get) => ({
    /**
     * Uploads a profile photo for the student.
     * @param {string} photoURL - The URL of the photo to upload.
     */
    uploadProfilePhoto: (photoURL: string) => {
      // set({ photoURL });
    },

    createStudentProfile: async (profileDetails: StudentProfileFormData): Promise<StudentProfile> => {
      const {profile, errorMsg} = await studentProfileRepository.createProfile(
        profileDetails
      );
        if (errorMsg) {
            console.error("Error creating profile: ", errorMsg);
            throw new Error(errorMsg);
        }
        if (profile === undefined) {
            throw new Error("Unexpected error occurred");
        }
        console.log("Profile created successfully: ", profile);
        return profile;
    },
  }));

export default createStudentProfileFormStore;
