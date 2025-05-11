import { previewStudentsData, StudentProfile } from "../src/data/domain/models/StudentProfile";
import StudentProfileRepositoryRemote from "../src/data/repositories/StudentProfile/StudentProfileRepositoryRemote";
import SMSAPIServiceMock from "../src/data/services/api/smsapiservice/SMSAPIServiceMock";
import { createStudentsProfilesStore } from "../src/data/stores/StudentProfileStore";
 
describe('add profile is added to profiles', ()=>{
    test('initial state is empty', () => {
        const smsAPIService = new SMSAPIServiceMock()
        const store = createStudentsProfilesStore(new StudentProfileRepositoryRemote(smsAPIService))
        expect(store.getState().profiles).toEqual([]);
      });

    test('profile is contained in store when added', ()=>{
        const smsAPIService = new SMSAPIServiceMock()
        const store = createStudentsProfilesStore(new StudentProfileRepositoryRemote(smsAPIService))
        const studentProfile: StudentProfile = previewStudentsData[0]
        store.getState().addProfile(studentProfile)
        expect(store.getState().profiles.find(profile => profile.studentId === studentProfile.studentId)).toBeTruthy()
    })
})