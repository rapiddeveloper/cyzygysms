export enum EnrollmentStatus {
    ENROLLED = 'enrolled',
    ALUMNI = 'alumni',
    GRADUATED = 'graduated',
}

export interface Student {
    fullname: string;
    email: string;
    enrollmentStatus: EnrollmentStatus;
    studentId: string;
    photoURL: string;
}

export const previewStudentsData: Student[] = [
    {
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        enrollmentStatus: EnrollmentStatus.ENROLLED,
        studentId: 'S12345',
        photoURL: 'https://i.pravatar.cc/150?img=3'
    },
    {
        fullname: 'Jane Smith',
        email: 'jane.smith@example.com',
        enrollmentStatus: EnrollmentStatus.GRADUATED,
        studentId: 'S12346',
        photoURL: 'https://i.pravatar.cc/150?img=4'

    },

    {
        fullname: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        enrollmentStatus: EnrollmentStatus.ALUMNI,
        studentId: 'S12347',
        photoURL: 'https://i.pravatar.cc/150?img=4'

    },
];
