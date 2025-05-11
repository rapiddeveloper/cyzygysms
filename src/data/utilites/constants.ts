import { EnrollmentStatus, StudentProfileFormData } from "../domain/models/StudentProfile"

export const constants = {
    actionSheetHorizontalPadding: 16,
    actionSheetVerticalPadding: 24,
    actionSheetVerticalSpacing: 8,

    containerPaddingBlock: 32,
    containerPaddingInline: 20,

    // Form styles
    formPhotoErrorFontSize: 12,
    formPhotoErrorMarginTop: 4,
    formPhotoErrorMarginLeft: 10,
    
    // Label styles
    formLabelMarginLeft: 10,
    
    // Button styles
    formButtonMarginTop: 40,
    formButtonHeight: 40,
    formButtonBorderRadius: 10,
    
    // Container styles
    containerPadding: 8,
    
    // Input styles
    inputHeight: 40,
    inputPadding: 10,
    inputBorderRadius: 4,
}

export const emptyFormData: StudentProfileFormData = {file: {uri: '', name: '-1', type: '-1'}, name: '', enrollmentStatus: EnrollmentStatus.ENROLLED, email: ''}


 