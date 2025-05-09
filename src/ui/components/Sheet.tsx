import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import SettingsBottomSheet from "./SettingsBottomSheet";
import { AppSettingKind } from "../../data/domain/models/AppSettings";
import { StudentProfile } from "../../data/domain/models/StudentProfile";
import StudentProfileActionSheet from "./StudentProfileActionSheet";

type StudentProfileActionSheetProps = {
  onDeleteProfile: () => void;
  onEditProfile: () => void;
};

registerSheet("settings-bottom-sheet", SettingsBottomSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "settings-bottom-sheet": SheetDefinition<{
      payload: { settingKind: AppSettingKind };
    }>;
    // 'student-profile-sheet': SheetDefinition<{payload: {profile: Student}}>;
    "student-profile-sheet": SheetDefinition<{
      payload: StudentProfileActionSheetProps;
    }>;
  }
}

registerSheet("student-profile-sheet", StudentProfileActionSheet);

export {};
