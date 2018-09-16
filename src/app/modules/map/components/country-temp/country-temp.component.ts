import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../../../services/weather-service/weather.service';
import { AVAILABLE_SERVICES } from '../../../../services/api-service/configs/api.config';

@Component({
  selector: 'rh-country-temp',
  templateUrl: './country-temp.component.html',
  styleUrls: ['./country-temp.component.scss']
})
export class CountryTempComponent implements OnInit {
  @Input() lat: any;
  @Input() lon: any;
  @Input() countryName: string;
  temp: any = '';
  time: any;
  weatherIcon: any;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getTemp();
  }

  getTemp(): void {
    // Move this to the country with an expiration of some kind.
    this.weatherService.getWeather(AVAILABLE_SERVICES.GET_WEATHER_DATA, {}, {lat: this.lat, lon: this.lon})
      .subscribe(values => {
        this.temp = Math.round(values.main.temp);
        this.time = new Date(values.dt * 1000);
      });
  }
}
