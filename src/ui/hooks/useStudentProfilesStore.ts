import { useStore } from 'zustand'
import { StudentsProfilesStore } from '../../data/stores/StudentProfileStore';
import React from 'react';
import { StudentsProfilesStoreContext } from '../providers/StudentsProfilesStoreProvider';

 
export const useStudentsProfilesStore = <U>(selector: (state: StudentsProfilesStore) => U) => {
  const store = React.useContext(StudentsProfilesStoreContext);
  if (!store) {
    throw new Error("useStudentsProfilesStore must be used within a StudentsProfilesStoreProvider");
  }
  return useStore(store, selector);
};