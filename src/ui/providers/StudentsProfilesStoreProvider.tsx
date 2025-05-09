import React from "react";
import {  StoreApi } from "zustand";
  
 import { createStudentsProfilesStore, StudentsProfilesStore } from "../../data/stores/StudentProfileStore";
import SMSAPIServiceMock from "../../data/services/api/smsapiservice/SMSAPIServiceMock";
import StudentProfileRepositoryRemote from "../../data/repositories/StudentProfile/StudentProfileRepositoryRemote";
 
type StoreProviderProps = {
  children: React.ReactNode;
};

 export const StudentsProfilesStoreContext =
  React.createContext<StoreApi<StudentsProfilesStore> | null>(null);

export const StudentsProfilesStoreProvider = ({ children }: StoreProviderProps) => {
  const smsAPIService = new SMSAPIServiceMock()

  const [store] = React.useState(
     createStudentsProfilesStore(new StudentProfileRepositoryRemote(smsAPIService))
   );

  return (
    <StudentsProfilesStoreContext.Provider value={store}>
      {children}
    </StudentsProfilesStoreContext.Provider>
  );
};


 
