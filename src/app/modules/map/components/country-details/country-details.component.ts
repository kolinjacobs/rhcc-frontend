import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from '../../models/country.model';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes, query, stagger
} from '@angular/animations';
@Component({
  selector: 'rh-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  animations: [
    trigger('appearIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        animate('.5s', keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 0.2, transform: 'translateX(5px)', offset: 0.8}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate('.5s', keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0, offset: 0.8}),
          style({opacity: 1, offset: 1.0})
        ]))
      ])
    ])
    // trigger('listAnimation', [
    //   transition('* => *', [
    //     query(':enter', style({ opacity: 0 }), {optional: true}),
    //     query(':enter', stagger('100ms', [
    //       animate('.3s ease-in', keyframes([
    //         style({opacity: 0, transform: 'translateY(75%)', offset: 0}),
    //         style({opacity: .5, transform: 'translateY(-25px)',  offset: 0.3}),
    //         style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
    //       ]))]), {optional: false})
    //   ])
    // ])
  ]
})
export class CountryDetailsComponent implements OnInit {
  @Input() country: Country;
  @Input() mainImage: string;
  @Output() selectItem: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  loadItem(mission) {
    this.selectItem.emit(mission);
  }
}
