import { useStore } from "zustand";
import StudentProfileRepositoryRemote from "../../data/repositories/StudentProfile/StudentProfileRepositoryRemote";
import SMSAPIServiceMock from "../../data/services/api/smsapiservice/SMSAPIServiceMock";
import createStudentProfileFormStore, { StudentProfileFormStore } from "../../data/stores/StudentProfileFormStore";


const useStudentProfileFormStore =  <U>(selector: (store: StudentProfileFormStore)=> U) => {    
    const smsAPIServiceMock = new SMSAPIServiceMock();
    const repository = new StudentProfileRepositoryRemote(smsAPIServiceMock);

    const formStore = createStudentProfileFormStore(repository);
    
    return useStore(formStore, selector);
}

export default useStudentProfileFormStore;