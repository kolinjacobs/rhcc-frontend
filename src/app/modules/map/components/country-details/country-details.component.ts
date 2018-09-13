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
