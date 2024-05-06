import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [ './home-page.component.css' ]
})
export class HomePageComponent {


  showSettingsIcon = true;

  constructor(private router: Router) {

    console.log("Application for DOM Chat GPT is starting...");

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSettingsIcon = event.url !== '/settings';
      }
    });

    

  }

}
