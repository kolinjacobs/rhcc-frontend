import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rh-mission-info',
  templateUrl: './mission-info.component.html',
  styleUrls: ['./mission-info.component.scss']
})
export class MissionInfoComponent implements OnInit {

  @Input() stats: {missionaries: number, countries: number} = {missionaries: 0, countries: 0};

  constructor() { }

  ngOnInit() {
  }

}
