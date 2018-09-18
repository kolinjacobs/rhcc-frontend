import { AfterContentInit, Component, Host, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as d3 from 'd3';
import * as d3geo from 'd3-geo';
import {Country} from '../../models/country.model';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { CountryInfoCardComponent } from '../../components/country-info-card/country-info-card.component';

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
  showList = false;
  @ViewChild(CountryInfoCardComponent) countryInfoCardComponent;

  constructor(private store: Store<fromStore.SharedState>) { }

  ngAfterContentInit() {
    this.startIdle();
    this.store.pipe(select(fromStore.selectIsIdle)).subscribe(idle => {
      if (idle && this.countryInfoCardShowing) {
        this.showList = false;
        this.countryInfoCardComponent.toggleCard();
      }
    });
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    // new syntax for selectors
    this.store.pipe(select(fromStore.getAllMapData)).subscribe( mapData => {
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
          this.selectedCountry = {...this.countries.find(x => x.tid === this.selectedCountry.tid)};
        }
        this.addCountyPoints(this.countries);
      }
    });
  }

  startIdle() {
    this.store.dispatch(new fromStore.ExtendIdleTime());
  }

  renderMap(data) {
    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', this.zoomed);

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
      .attr('stdDeviation', 2)
      .call(zoom);

  }

  renderPoints() {
    this.svg
      .selectAll('circle')
      .data([...this.points]).enter()
      .append('circle')
      .attr('cx', (d) => this.projection(d.point)[0])
      .attr('cy', (d) => this.projection(d.point)[1])
      // .attr('r', (d) => Math.max(10 , Math.min(d.count * 10, 80)) + 'px')
      .attr('r', (d) => Math.max(16, (16 * (d.count / 3))) + 'px')
      .attr('fill', '#EBA313')
      // .attr('fill', 'transparent')
      // .attr('stroke', '#EBA313')
      // .attr('stroke-width', '3')
      .attr('name', (d) => d.name)
      .attr('class', 'outer-circle')
      .attr('type', 'mission')
      .attr('opacity', 0.15)
      .append('animate')
      .attr('attributeName', 'r')
      .attr('values', (d) => `${Math.max(16, (16 * (d.count / 3)))}; ${Math.max(16, (16 * (d.count / 3))) + 5}; ${Math.max(16, (16 * (d.count / 3)))};`)
      .attr('begin', `0s`)
      .attr('keyTimes', '0; 0.5; 1')
      .attr('dur', '2s')
      .attr('calcMode', 'linear')
      .attr('repeatCount', 'indefinite');

    this.svg
      .selectAll('circle2')
      .data([...this.points]).enter()
      .append('circle')
      .attr('cx', (d) => this.projection(d.point)[0])
      .attr('cy', (d) => this.projection(d.point)[1])
      // .attr('r', (d) => Math.max(10 , Math.min(d.count * 8, 50)) + 'px')
      .attr('r', (d) => Math.max(12, (13 * (d.count / 3))) + 'px')
      .attr('fill', '#EBA313')
      // .attr('fill', 'transparent')
      // .attr('stroke', '#EBA313')
      // .attr('stroke-width', '6')
      .attr('name', (d) => d.name)
      .attr('class', 'medium-circle')
      .attr('type', 'mission')
      .attr('opacity', 0.25)
      .append('animate')
      .attr('attributeName', 'r')
      .attr('values', (d) => `${Math.max(12, (14 * (d.count / 3)))}; ${Math.max(12, (14 * (d.count / 3))) + 3}; ${Math.max(12, (14 * (d.count / 3)))}`)
      .attr('begin', `0s`)
      .attr('keyTimes', '0; 0.5; 1')
      .attr('dur', '2s')
      .attr('calcMode', 'linear')
      .attr('repeatCount', 'indefinite');

    this.svg
      .selectAll('circle3')
      .data([...this.points]).enter()
      .append('circle')
      .attr('cx', (d) => this.projection(d.point)[0])
      .attr('cy', (d) => this.projection(d.point)[1])
      // .attr('r', '7px')
      .attr('r', (d) => Math.max(10, (10 * (d.count / 3))) + 'px')
      .attr('fill', '#EBA313')
      .attr('name', (d) => d.name)
      .attr('type', 'mission')
      .attr('opacity', 0.5);
  }

  addCountyPoints(countries: Country[]) {
    countries = countries.filter(c => c.mission_count > 0);
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

  selectFromRow(country) {
    this.selectedCountry = country;
    this.toggleCountryInfoCard();
  }

  toggleCountryInfoCard() {
    if (this.countryInfoCardShowing) {
      this.selectedCountry = null;
    }
    this.countryInfoCardShowing = !this.countryInfoCardShowing;
  }

  zoomed(g) {
    g.attr('transform', d3.event.transform);
  }

  toggleList() {
    this.showList = !this.showList;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onStart(event) {
    this.store.dispatch(new fromStore.NotIdle());
    this.store.dispatch(new fromStore.ExtendIdleTime());
  }
}
