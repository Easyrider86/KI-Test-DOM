import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAIConfiguration, Setting } from "../../constants/IAIConfiguration";

@Component({
    selector: 'base-setting',
    templateUrl: './BaseSettingsComponent.html',
    styleUrls: ['./BaseSettingsComponent.css']
})
export class BaseSettingComponent {

    constructor(public router: Router) { }
  
    getSettings(): Setting[] {
        return [];
    }
    
    setSetting(settings: Setting[]) {

    }

}