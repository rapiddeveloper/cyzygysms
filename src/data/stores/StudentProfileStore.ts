import { createStore } from "zustand/vanilla";
import { StudentProfile } from "../domain/models/StudentProfile";
import StudentProfileRepository from "../repositories/StudentProfile/StudentProfileRepository";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "expo-sqlite/kv-store";
import { MMKV } from 'react-native-mmkv'
import { RequestStatus } from "../@types/Result";

export interface StudentsProfilesStore {
  profiles: StudentProfile[];
  addProfile: (profile: StudentProfile) => void;
  getProfile: (profileId: string) => StudentProfile | null;
  replaceProfile: (profile: StudentProfile) => void;
  deleteProfile: (profileId: string) => Promise<boolean>
}


export const storage = new MMKV({
    id: 'student-profiles-mmkv',
    encryptionKey: 'student-profiles-key'
})

const mmkvStorage = {
  setItem: (name: string, value: string) => {
    return storage.set(name, value)
  },
  getItem: (name: string) => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: (name: string) => {
    return storage.delete(name)
  },
}

export const createStudentsProfilesStore = (
  studentProfileRepository: StudentProfileRepository
) =>
  createStore<StudentsProfilesStore>()(
    persist(
      (set, get) => ({
        profiles: [],
        addProfile: (profile: StudentProfile) => {
          set((state) => ({
            profiles: [{...profile}, ...state.profiles],
          }));
        },
        deleteProfile: async (profileId: string): Promise<boolean> => {
          set((prev)=>({
            profiles: [...prev.profiles.filter((profile)=> profile.studentId !== profileId)]
          }))
            const {status, errorMsg} = await studentProfileRepository.deleteProfile(profileId)
            if (errorMsg) {
              throw Error(errorMsg)
            }

            if (status === undefined) {
              throw Error("Unexpected Errror occurred")
            }

          
            return status
        },

        getProfile: (profileId: string): StudentProfile | null => {
           const found = get().profiles.find((profile)=> profile.studentId === profileId)
           return found !== undefined ? found : null
        }, 
        replaceProfile: (profile: StudentProfile) => {
          // const foundIdx = get().profiles.findIndex((profile)=> profile.studentId === profile.studentId)
          // if (foundIdx === -1) {return}
          // let temp = [...get().profiles]
          // temp[foundIdx] = profile
          // set({profiles: temp})
          set((prev)=>({
            profiles: [...prev.profiles.map((currProfile)=> currProfile.studentId === profile.studentId ? profile : currProfile)]
          }))
        }
      }),
      {
        name: "student-profiles-storage", // unique name
        storage: createJSONStorage(() => mmkvStorage), // (optional) by default the 'localStorage' is used
      }
    )
  );
