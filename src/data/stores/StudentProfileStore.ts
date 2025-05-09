import { createStore } from "zustand/vanilla";
import { StudentProfile } from "../domain/models/StudentProfile";
import StudentProfileRepository from "../repositories/StudentProfile/StudentProfileRepository";

export interface StudentsProfilesStore {
  profiles: StudentProfile[];
  addProfile: (profile: StudentProfile) => void;
}

export const createStudentsProfilesStore = (
  studentProfileRepository: StudentProfileRepository
) =>
  createStore<StudentsProfilesStore>()((set, get) => ({
    profiles: [],
    addProfile: (profile: StudentProfile) => {
      set((state) => ({
        profiles: [...state.profiles, profile],
      }));
    },
  }));
