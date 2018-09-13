export interface ApiConfig {
  METHOD: string;
  URL: string;
}

export const AVAILABLE_SERVICES = {
  GET_COUNTRIES: {
    METHOD: 'get',
    URL: '/api/countries?_format=api_json'
  },
  GET_COUNTRIES_DATA: {
    METHOD: 'get',
    URL: '/api/taxonomy_term/country?include=flag,flag.field_image,country_image,country_image.field_image'
  },
  GET_MISSIONS: {
    METHOD: 'get',
    URL: `/api/mission?include=\
country,mission_image,mission_image.thumbnail&filter%5Bcountry%5D%5Bcondition%5D%5Bpath%5D=\
country.tid&filter%5Bcountry%5D%5Bcondition%5D%5Bvalue%5D={id}&sort=-changed`
  },
  GET_MISSIONS_DATA: {
    METHOD: 'get',
    URL: `/api/node/mission_update?filter%5BmissionUpdate%5D%5Bcondition%5D%5Bpath%5D=mission_assignment.nid&filter%5Bmission\
Update%5D%5Bcondition%5D%5Bvalue%5D={id}&include=mission_assignment,image,image.field_image&sort=-created`
  },
  GET_WEATHER_DATA: {
    METHOD: 'get',
    URL: `/data/2.5/weather?lat={lat}&lon={lon}&appid=981a67641076291487e85c0d1925cf9a`
  }
};
