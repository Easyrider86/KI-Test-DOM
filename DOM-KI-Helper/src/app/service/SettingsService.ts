import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/**
 * Class to save and read settings in the cookies of the webapp.
 */
export class Setting {
    key: string = "";
    value: string = "";

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

@Injectable({
    providedIn: 'root'
})
export class SettingService {
    /**
     * Private constructor
     * @param cookieService Injected cookie service by ngx-cookie-service.
     */
    constructor(private cookieService: CookieService) { }

    /**
     * Stores all settings within the settings array in the local cookies.
     * @param settings The list of settings to be saved.
     */
    saveSettings(settings: Setting[]) {
        settings.forEach(element => {
            this.cookieService.set(element.key, element.value);
        });
    }

    /**
     * Loads the value of the given key from the cookie of settings.
     * @param key The key of the setting to find within the cookies.
     * @returns Returns the value of the setting as string or empty.
     */
    loadSetting(key: string): string {

        let value: string = "";

        if (this.cookieService.check(key)) {
            value = this.cookieService.get(key);
        }

        if (value) {
            return value;
        }
        else {
            console.debug("Der angegebene Wert für den Key " + key + " existiert nicht.");
            return "";
        }
    }

}

