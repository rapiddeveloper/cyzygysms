import { AppSetting, AppSettingKind } from "../../../data/domain/models/AppSettings";

export interface SettingsViewProps {
  settings: AppSetting[];
  onHandleSelect: (kind: AppSettingKind) => void;
}