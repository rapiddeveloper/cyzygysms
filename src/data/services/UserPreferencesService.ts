import Storage from 'expo-sqlite/kv-store';

class UserPreferencesService {
  private preferences: { [key: string]: any } = {};
  private storageKey: string = 'userPreferences';
  static shared: UserPreferencesService = new UserPreferencesService();

  constructor() {
    (async ()=>{
         await this.loadPreferences();
    })()
   }

  private async loadPreferences()  {
    const savedPreferences = await Storage.getItem(this.storageKey);
    if (savedPreferences) {
      this.preferences = JSON.parse(savedPreferences);
      console.log("Preferences loaded", this.preferences)
    }
  }

  getPreference(key: string): any {
    return this.preferences[key];
  }

    setPreference(key: string, value: any): void {
        this.preferences[key] = value;
        console.log(this.preferences)
        Storage.setItem(this.storageKey, JSON.stringify(this.preferences));
    }
    
    removePreference(key: string): void {
        delete this.preferences[key];
        Storage.setItem(this.storageKey, JSON.stringify(this.preferences));
    }
}

export default  UserPreferencesService;