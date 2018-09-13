import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from '../../models/country.model';

@Component({
  selector: 'rh-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
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
