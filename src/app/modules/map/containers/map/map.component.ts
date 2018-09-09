import {AfterContentInit, Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as d3 from 'd3';
import * as d3geo from 'd3-geo';
import {Country} from '../../models/country.model';

@Component({
  selector: 'rh-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterContentInit {

  innerWidth: any;
  innerHeight: any;
  svg: any;
  projection: any;
  points: Array<{point: [number, number], name: string, count: number}> = [];
  countries: Array<Country>;
  countryInfoCardShowing = false;
  selectedCountry: Country;
  missionStats: {missionaries: number, countries: number} = {missionaries: 0, countries: 0};

  constructor(private store: Store<fromStore.SharedState>) { }

  ngAfterContentInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    // new syntax for selectors
    this.store.pipe( select(fromStore.getAllMapData)).subscribe( mapData => {
      if (mapData) {
        this.renderMap(mapData);
      } else {
        this.store.dispatch(new fromStore.LoadMapData({}));
      }
    });

    this.store.pipe( select(fromStore.getCountriestate)).subscribe( countrieState => {
      if ( !countrieState.loaded && !countrieState.loading) {
        this.store.dispatch(new fromStore.LoadCountries({}));
      } else if ( countrieState.loaded && !countrieState.loading) {
        if (!countrieState.data_loaded) {
          this.store.dispatch(new fromStore.LoadCountryData());
        }
        this.countries = countrieState.countries;
        if (this.selectedCountry) {
          console.log('test');
          this.selectedCountry = {...this.countries.find(x => x.tid === this.selectedCountry.tid)};
          console.log(this.selectedCountry);
        }
        this.addCountyPoints(this.countries);
      }
    });
  }

  renderMap(data) {

    this.projection = d3geo.geoEquirectangular()
      .scale([this.innerWidth / (2  * Math.PI)]) // scale to fit group width
      .translate([this.innerWidth / 2, this.innerHeight / 1.6]);

    const path = d3geo.geoPath().projection(this.projection);

    this.svg = d3.select('.map-holder');
    // .append('svg')
    // .attr('height': this.innerHeight)
    // .attr('width': this.innerWidth);

    this.svg
      .selectAll('.country')
      .data(data.features)
      .enter().append('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('fill', '#50737E')
      .attr('stroke', '#1CA3BB');

    this.svg.append('defs')
      .append('filter')
      .attr('id', 'blur')
      .append('feGaussianBlur')
      .attr('stdDeviation', 2);

  }

  renderPoints() {
    this.svg
      .selectAll('circle')
      .data([...this.points]).enter()
      .append('circle')
      .attr('cx', (d) => this.projection(d.point)[0])
      .attr('cy', (d) => this.projection(d.point)[1])
      .attr('r', (d) => Math.max(10 , Math.min(d.count * 15, 80)) + 'px')
      .attr('fill', '#EBA313')
      .attr('name', (d) => d.name)
      .attr('type', 'mission')
      .attr('opacity', 0.15);

    this.svg
      .selectAll('circle2')
      .data([...this.points]).enter()
      .append('circle')
      .attr('cx', (d) => this.projection(d.point)[0])
      .attr('cy', (d) => this.projection(d.point)[1])
      .attr('r', (d) => Math.max(10 , Math.min(d.count * 10, 50)) + 'px')
      .attr('fill', '#EBA313')
      .attr('name', (d) => d.name)
      .attr('type', 'mission')
      .attr('opacity', 0.25);

    this.svg
      .selectAll('circle3')
      .data([...this.points]).enter()
      .append('circle')
      .attr('cx', (d) => this.projection(d.point)[0])
      .attr('cy', (d) => this.projection(d.point)[1])
      .attr('r', '7px')
      .attr('fill', '#EBA313')
      .attr('name', (d) => d.name)
      .attr('type', 'mission')
      .attr('opacity', 0.5);
  }

  addCountyPoints(countries: Country[]) {
    countries = countries.filter(c => c.mission_count > 0);
    console.log(countries);
    let missionaries = 0;
    let countries_count = 0;
    countries.forEach( c => {
      missionaries += Number(c.mission_count);
      countries_count++;
      this.points.push({point: c.geolocation, name: c.name, count: c.mission_count });
    });
    this.missionStats = {missionaries: missionaries, countries: countries_count};
    this.renderPoints();
  }

  selectCountry(e) {
    if (e.target.attributes.type && e.target.attributes.type.nodeValue === 'mission') {
      const name = e.target.attributes.name.nodeValue;
      this.selectedCountry = this.countries.find(c => c.name === name);
      this.toggleCountryInfoCard();
    }
  }

  toggleCountryInfoCard() {
    if (this.countryInfoCardShowing) {
      this.selectedCountry = null;
    }
    this.countryInfoCardShowing = !this.countryInfoCardShowing;
  }
}
