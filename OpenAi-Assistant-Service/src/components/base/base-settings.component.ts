import { Component } from '@angular/core';
import { IAIConfiguration, Setting } from "../../constants/IAIConfiguration";

@Component({
    selector: 'base-setting',
    templateUrl: './base-settings.component.html',
    styleUrls: ['./base-settings.component.css']
})
export class BaseSettingComponent {
  
    constructor() {}

    getSettings(): Setting[] {
        return [];
    }
    
    setSetting(settings: Setting[]) {

    }

}