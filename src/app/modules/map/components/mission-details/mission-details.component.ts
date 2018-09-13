import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

@Component({
  selector: 'rh-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss'],
  animations: [
    trigger('appearIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        animate('.5s', keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0, offset: 0.8}),
          style({opacity: 1, offset: 1.0})
        ]))
      ])
    ]),
    trigger('slideInRight', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(400, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ]),
  ]
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
