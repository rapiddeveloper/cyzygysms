import { useStore } from "zustand";
import StudentProfileRepositoryRemote from "../../data/repositories/StudentProfile/StudentProfileRepositoryRemote";
import SMSAPIServiceMock from "../../data/services/api/smsapiservice/SMSAPIServiceMock";
import createStudentProfileFormStore, { StudentProfileFormStore } from "../../data/stores/StudentProfileFormStore";
import { StudentProfileFormStoreContext } from "../providers/StudentProfileFormStoreProvider";
import React from "react";

/*
const useStudentProfileFormStore =  <U>(selector: (store: StudentProfileFormStore)=> U) => {    
    const smsAPIServiceMock = new SMSAPIServiceMock();
    const repository = new StudentProfileRepositoryRemote(smsAPIServiceMock);

    const formStore = createStudentProfileFormStore(repository);
    
    return useStore(formStore, selector);
}*/

const useStudentProfileFormStore =  <U>(selector: (store: StudentProfileFormStore)=> U) => {    
    const formStore = React.useContext(StudentProfileFormStoreContext);
     
     if (formStore === null) {
        throw Error("Not wrapped in Provider")
     }    
    return useStore(formStore, selector);
}

export default useStudentProfileFormStore;