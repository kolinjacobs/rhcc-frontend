export interface Country {
  name: string;
  mission_count: number;
  geolocation: [number, number];
  flag: string;
  continent: string;
  description: string;
  stats: string;
  statArr?: Array<any>;
  uuid: string;
  missions?: Array<any>;
  country_image: string;
  flag_image: string;
  tid: number;
  temp?: any;
}
