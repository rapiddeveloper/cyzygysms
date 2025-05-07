import { AppSettingKind } from '../../domain/models/AppSettings';
import UserPreferencesService from '../../services/UserPreferencesService';
import SettingRepository from './SettingRepository'
/**
 * SettingRepositoryRemote is a singleton class that extends the SettingRepository class.
 * It is used to manage online/offline settings.
 * 
 * @extends SettingRepository
 */
class SettingRepositoryRemote extends SettingRepository {
    
     private userPreferencesService: UserPreferencesService;

    constructor(userPreferencesService: UserPreferencesService) {
        super();
        this.userPreferencesService = userPreferencesService;
    }

    updateSetting(kind: AppSettingKind, value: string): boolean {
        this.userPreferencesService.setPreference(kind, value);
        return true;
    }  

    getSetting(kind: AppSettingKind): string | null {
        let value = this.userPreferencesService.getPreference(kind)
         if (kind === AppSettingKind.ENROLLMENTFILTER || kind === AppSettingKind.APPEARANCE) {
            return value as string;
        }
        return value;
    }

 }

export default SettingRepositoryRemote;