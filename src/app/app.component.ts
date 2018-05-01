import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MaterialIconsService } from './services/material-icons/material-icons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'Rolling Hills Covenant Church';
  @ViewChild('sidenav') sidenav: MatSidenav;
  menu: Array<Object> = [
    { name: 'Home', url: '', icon: 'home' },
    { name: 'Recipes', url: './recipes', icon: 'settings' },
    { name: 'Features', url: './features', icon: 'settings' }
  ];

  constructor(private materialIconsService: MaterialIconsService) {}

  ngOnInit() {
    this.materialIconsService.registerIcons();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
