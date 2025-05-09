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
  createStudentProfile: (studentData: StudentProfileFormData) => Promise<void>;
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

    createStudentProfile: async (profileDetails: StudentProfileFormData) => {
      const profile = await studentProfileRepository.createProfile(
        profileDetails
      );
        if (profile.errorMsg) {
            console.error("Error creating profile: ", profile.errorMsg);
            return;
        }

        console.log("Profile created successfully: ", profile.profile);
    },
  }));

export default createStudentProfileFormStore;
