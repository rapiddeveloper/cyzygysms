import { FileObj } from "../../@types/Result";

export enum EnrollmentStatus {
  ENROLLED = "enrolled",
  ALUMNI = "alumni",
  GRADUATED = "graduated",
  NONE = "all"
}

export interface StudentProfile {
  fullname: string;
  email: string;
  enrollmentStatus: EnrollmentStatus;
  studentId: string;
  photoURL: string;
}


export interface StudentProfileFormData {
    name: string;
    email: string;
    enrollmentStatus: string;
    file: FileObj
  }

export const previewStudentsData: StudentProfile[] = [
  {
    fullname: "John Doe",
    email: "john.doe@example.com",
    enrollmentStatus: EnrollmentStatus.ENROLLED,
    studentId: "S12345",
    photoURL: "https://i.pravatar.cc/150?img=3",
  },
  {
    fullname: "Jane Smith",
    email: "jane.smith@example.com",
    enrollmentStatus: EnrollmentStatus.GRADUATED,
    studentId: "S12346",
    photoURL: "https://i.pravatar.cc/150?img=4",
  },

  {
    fullname: "Alice Johnson",
    email: "alice.johnson@example.com",
    enrollmentStatus: EnrollmentStatus.ALUMNI,
    studentId: "S12347",
    photoURL: "https://i.pravatar.cc/150?img=4",
  },
];
