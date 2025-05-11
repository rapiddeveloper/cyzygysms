import { StudentProfile, StudentProfileFormData } from "../../domain/models/StudentProfile";

abstract class StudentProfileRepository {
    abstract createProfile(profileDetails: StudentProfileFormData): Promise<{profile?: StudentProfile, errorMsg?: string}>
    abstract updateProfile(profileDetails: StudentProfileFormData, profileId: string): Promise<{profile?: StudentProfile, errorMsg?: string}>;
    abstract deleteProfile(studentId: string): Promise<{status?: boolean, errorMsg?: string}>;
    /*
    abstract getProfile(studentId: string): Promise<StudentProfile | null>;
    abstract getAllProfiles(): Promise<StudentProfile[]>;
    */
}

export default StudentProfileRepository;