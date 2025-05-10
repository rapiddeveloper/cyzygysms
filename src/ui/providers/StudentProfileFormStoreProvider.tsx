import React from "react";
import { StoreApi } from "zustand";
import createStudentProfileFormStore, {
  StudentProfileFormStore,
} from "../../data/stores/StudentProfileFormStore";
import SMSAPIServiceMock from "../../data/services/api/smsapiservice/SMSAPIServiceMock";
import StudentProfileRepositoryRemote from "../../data/repositories/StudentProfile/StudentProfileRepositoryRemote";

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StudentProfileFormStoreContext =
  React.createContext<StoreApi<StudentProfileFormStore> | null>(null);

export const StudentProfileFormStoreProvider = ({
  children,
}: StoreProviderProps) => {
  const smsAPIService = new SMSAPIServiceMock();

  const [store] = React.useState(
    createStudentProfileFormStore(
      new StudentProfileRepositoryRemote(smsAPIService)
    )
  );

  return (
    <StudentProfileFormStoreContext.Provider value={store}>
      {children}
    </StudentProfileFormStoreContext.Provider>
  );
};
