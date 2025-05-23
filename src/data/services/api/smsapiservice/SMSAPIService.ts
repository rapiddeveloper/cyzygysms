import { FileObj, Result } from "../../../@types/Result";
import { StudentProfileFormData } from "../../../domain/models/StudentProfile";
import { StudentProfileAPIModel } from "../model/StudentProfileAPIModel";

abstract class SMSAPIService {
    abstract postProfileData(profileDetails: StudentProfileFormData): Promise<Result<StudentProfileAPIModel, Error>> 
    abstract patchProfileData(profileDetails: StudentProfileFormData, profileId: string, photoURL: string): Promise<Result<StudentProfileAPIModel, Error>> 
    abstract deleteProfileData(profileId: string): Promise<Result<boolean, Error>>
    abstract uploadImage(studentId: string, file: FileObj): Promise<Result<string, Error>>
}

export default SMSAPIService;