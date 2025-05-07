export interface AppSetting {
  kind: AppSettingKind;
  title: string;        
  description: string;
  values: string[];
  selected: string;
}

export enum AppSettingKind {      
    APPEARANCE = "appearance",
    ENROLLMENTFILTER = "enrollment Filter"
}