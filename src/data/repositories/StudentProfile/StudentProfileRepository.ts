import { StudentProfile, StudentProfileFormData } from "../../domain/models/StudentProfile";

abstract class StudentProfileRepository {
    abstract createProfile(profileDetails: StudentProfileFormData): Promise<{profile?: StudentProfile, errorMsg?: string}>
    abstract updateProfile(profile: StudentProfile): Promise<boolean>;
    abstract deleteProfile(studentId: string): Promise<boolean>;
    abstract getProfile(studentId: string): Promise<StudentProfile | null>;
    abstract getAllProfiles(): Promise<StudentProfile[]>;
}

export default StudentProfileRepository;