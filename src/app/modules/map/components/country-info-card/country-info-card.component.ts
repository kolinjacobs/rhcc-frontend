import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Country} from '../../models/country.model';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'rh-country-info-card',
  templateUrl: './country-info-card.component.html',
  styleUrls: ['./country-info-card.component.scss']
})
export class CountryInfoCardComponent implements OnInit, OnChanges {
  @Input() showing = false;
  @Input() country: Country;
  @Output() toggle = new EventEmitter();
  selectedMission: any;
  mainImage: string;
  constructor(private store: Store<fromStore.SharedState>) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.country && !this.country.missions) {
      this.store.dispatch(new fromStore.LoadCountryMissions(this.country));
    }
    if (this.selectedMission || this.country) {
      this.mainImage = this.selectedMission ? this.selectedMission.mission_image : this.country.country_image;
    }
    if (this.selectedMission) {
      console.log('nice');
      this.selectedMission = this.country.missions.find(x => x.nid === this.selectedMission.nid);
    }
  }

  loadMission(mission) {
    this.selectedMission = mission;
    this.mainImage = this.selectedMission.mission_image ? this.selectedMission.mission_image : this.country.country_image;
    if (!this.selectedMission.updates) {
      this.store.dispatch(new fromStore.LoadCountryMissionsData({country: this.country, mission_id: mission.nid}));
    }
  }

  toggleCard() {
    this.selectedMission = null;
    this.mainImage = null;
    this.toggle.emit();
  }

}
