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
    URL: '/api/taxonomy_term/country?include=flag,flag.imageFile,country_image,country_image.imageFile'
  },
  GET_MISSIONS: {
    METHOD: 'get',
    URL: `/api/mission?include=\
country,mission_image,mission_image.thumbnail,mission_image.imageFile&filter%5Bcountry%5D%5Bcondition%5D%5Bpath%5D=\
country.tid&filter%5Bcountry%5D%5Bcondition%5D%5Bvalue%5D={id}`
  },
  GET_MISSIONS_DATA: {
    METHOD: 'get',
    URL: `/api/node/mission_update?filter%5BmissionUpdate%5D%5Bcondition%5D%5Bpath%5D=mission_assignment.nid&filter%5Bmission\
Update%5D%5Bcondition%5D%5Bvalue%5D={id}&include=mission_assignment,field_image,field_image.thumbnail,field_image.imageFile&sort=-created`
  },
  GET_WEATHER_DATA: {
    METHOD: 'get',
    URL: `http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=981a67641076291487e85c0d1925cf9a`
  }
};
