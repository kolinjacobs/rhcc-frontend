import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Country } from '../../models/country.model';

@Component({
  selector: 'rh-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.scss']
})
export class MissionsListComponent implements OnInit {
  @Output() countrySelection: EventEmitter<any> = new EventEmitter<any>();
  countries: Array<Country>;
  allLoaded = false;
  constructor(private store: Store<fromStore.SharedState>) { }

  ngOnInit() {
    this.store.pipe(select(fromStore.getAllCountriesMissionsLoaded)).subscribe(state => {
      this.allLoaded = state;
      if (!state) {
        this.store.dispatch(new fromStore.LoadAllCountryMissions());
      }
    });

    this.store.pipe(select(fromStore.getCountries)).subscribe(countries => {
      if (this.allLoaded) {
        this.countries = countries.filter(country => country.mission_count > 0);
      }
    });
  }

  selectCountry(country) {
    this.countrySelection.emit(country);
  }
}
