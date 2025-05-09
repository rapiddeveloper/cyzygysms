import { FileObj, Result } from "../../../@types/Result";
import { StudentProfileFormData } from "../../../domain/models/StudentProfile";
import { StudentProfileAPIModel } from "../model/StudentProfileAPIModel";

abstract class SMSAPIService {
    abstract postProfileData(profileDetails: StudentProfileFormData): Promise<Result<StudentProfileAPIModel, Error>> 
    abstract uploadImage(studentId: string, file: FileObj): Promise<Result<string, Error>>
}

export default SMSAPIService;