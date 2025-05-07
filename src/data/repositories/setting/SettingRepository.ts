import { AppSettingKind } from "../../domain/models/AppSettings";

abstract class SettingRepository {   
 
    abstract updateSetting(kind: AppSettingKind, value: string): boolean;
}

export default SettingRepository;