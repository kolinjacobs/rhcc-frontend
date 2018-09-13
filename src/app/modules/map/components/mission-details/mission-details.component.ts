import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rh-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss']
})
export class MissionDetailsComponent implements OnInit {
  @Input() selectedMission: any;
  @Input() mainImage: string;
  @Output() goBack: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  back() {
    this.goBack.emit();
  }
}
