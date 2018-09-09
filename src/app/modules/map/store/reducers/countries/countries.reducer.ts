import * as fromActions from '../../actions/countries/countries.actions';
import { Store } from '@ngrx/store';
import {Country} from '../../../models/country.model';

export interface CountriesState {
  countries: Country[];
  loaded: boolean;
  loading: boolean;
  data_loaded: boolean;
  error: any;

}

export const initialState: CountriesState = {
  countries: null,
  loaded: false,
  loading: false,
  data_loaded: false,
  error: undefined
};

export const getCountries = (state: CountriesState) => {
  return state && state.countries;
};

export const getCountriesLoading = (state: CountriesState) => state && state.loaded;

export function reducer(
  state = initialState,
  action: fromActions.CountriesActions
): CountriesState {
  switch (action.type) {

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES: {
      return {
        ...state,
        loading: true,
        error: undefined
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_SUCCESS: {
      let countries = action.payload;
      countries = countries.map( c => {
        const lon = Number(c.geolocation.substring(0, c.geolocation.indexOf('|')));
        const lat = Number(c.geolocation.substring(c.geolocation.indexOf('|') + 1).trim());
        return {...c, geolocation: [lat, lon] };
      });

      return {
        ...state,
        loaded: true,
        loading: false,
        countries
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_DATA: {
      return {
        ...state,
        loading: true,
        error: undefined
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_DATA_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_DATA_SUCCESS: {
      const { included, data } = action.payload;
      const countries = state.countries.map(x => {
        let contry = x;
        const relationships = data.find( c => c.id === x.uuid).relationships;
        const tid = data.find( c => c.id === x.uuid).attributes.tid;
        if (contry.stats) {
          contry.statArr = contry.stats.split('\\').filter(i => i !== '');
        }
        let country_image: string;
        if (relationships.country_image.data) {
          const country_image_id = included.find( r => r.id === relationships.country_image.data.id).relationships.imageFile.data.id;
          country_image  = included.find( r => r.id === country_image_id).attributes.url;
          contry = { ...contry, country_image };
        }
        let flag_image: string;
        if (relationships.flag.data) {
          const flag_image_id = included.find( r => r.id === relationships.flag.data.id).relationships.imageFile.data.id;
          flag_image = included.find( r => r.id === flag_image_id).attributes.url;
          contry = { ...contry, flag_image };
        }
        return {...contry, tid};
      });

      return {
        ...state,
        loaded: true,
        loading: false,
        data_loaded: true,
        countries
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS: {
      return {
        ...state,
        loading: true,
        error: undefined
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_DATA_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_SUCCESS: {
      const country = state.countries.find(x => x.tid === action.id);

      const missions = action.payload.data.map(x => {
        let mission = {...x.attributes};
        mission.changed = new Date(mission.changed * 1000);
        if (x.relationships.mission_image.data) {
          const id = x.relationships.mission_image.data.id;
          const image_id = action.payload.included.find(i => i.id === id).relationships.imageFile.data.id;
          const image = action.payload.included.find(i => i.id === image_id).attributes.url;
          mission = {...mission, mission_image: image};
        }
        return {...mission, parent_id: country.tid};
      });

      const countries = state.countries.map(x => {
        if (x.tid === action.id) {
          return {...x, missions};
        }
        return x;
      });
      return {
        ...state,
        loaded: true,
        loading: false,
        countries
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_DATA: {
      return {
        ...state,
        loading: true,
        error: undefined
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_DATA_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_DATA_SUCCESS: {
      const updates = action.payload.data.map(x => {
        let { attributes, ...item} = x;
        attributes.changed = new Date(attributes.changed * 1000);
        if (x.relationships.field_image.data) {
          const id = x.relationships.field_image.data.id;
          const image_id = action.payload.included.find(i => i.id === id).relationships.imageFile.data.id;
          const image = action.payload.included.find(i => i.id === image_id).attributes.url;
          attributes = {...attributes, image: image};
        }
        return { ...item, attributes };
      });

      const country = state.countries.find(x => x.tid === action.country.country.tid);
      country.missions = country.missions.map (x => {
        if (x.nid === action.country.mission_id) {
          x.updates = updates;
        }
        return x;
      });
      const countries = state.countries.map(x => {
        if (x.tid === country.tid) {
          return country;
        }
        return x;
      });

      return {
        ...state,
        loaded: true,
        loading: false,
        countries
      };
    }

    default:
      return state;
  }
}
