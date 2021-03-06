import * as fromActions from '../../actions/countries/countries.actions';
import {Country} from '../../../models/country.model';

export interface CountriesState {
  countries: Country[];
  loaded: boolean;
  loading: boolean;
  data_loaded: boolean;
  all_loaded: boolean;
  error: any;

}

export const initialState: CountriesState = {
  countries: null,
  loaded: false,
  loading: false,
  data_loaded: false,
  all_loaded: false,
  error: undefined
};

export const getCountries = (state: CountriesState) => {
  return state && state.countries;
};

export const getCountriesLoading = (state: CountriesState) => state && state.loaded;
export const getAllCountriesLoaded = (state: CountriesState) => state && state.all_loaded;

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
          const split = contry.stats.split('\\').filter(i => i !== '');
          contry.statArr = split.map(stat => {
            const splData = stat.split(':');
            return { label: splData[0], stat: splData[1] };
          });
        }
        let country_image: string;
        if (relationships.country_image.data) {
          const related = included.find( r => r.id === relationships.country_image.data.id);
          if (related) {
            const country_image_id = related.relationships.field_image.data.id;
            country_image = included.find(r => r.id === country_image_id).attributes.url;
            contry = {...contry, country_image};
          }
        }
        let flag_image: string;
        if (relationships.flag.data) {
          const related = included.find( r => r.id === relationships.flag.data.id);
          if (related) {
            const flag_image_id = related.relationships.field_image.data.id;
            flag_image = included.find(r => r.id === flag_image_id).attributes.url;
            contry = {...contry, flag_image};
          }
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

    case fromActions.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_SUCCESS: {
      const country = state.countries.find(x => x.tid === action.id);

      const missions = action.payload.data.map(x => {
        let mission = {...x.attributes};
        mission.changed = new Date(mission.changed * 1000);
        if (x.relationships.mission_image.data && Array.isArray(x.relationships.mission_image.data)) {
          const ids = x.relationships.mission_image.data.map(image => image.id);
          if (ids && ids.length > 0) {
            const image_ids = ids.map(id => action.payload.included.find(i => i.id === id).relationships.field_image.data.id);
            const images = image_ids.map(image_id => action.payload.included.find(i => i.id === image_id).attributes.url);
            // Keeping the mission_image for fallback.
            mission = {...mission, mission_images: images, mission_image: images[ 0 ]};
          }
        } else if (x.relationships.mission_image.data) {
          const id = x.relationships.mission_image.data.id;
          const image_id = action.payload.included.find(i => i.id === id).relationships.field_image.data.id;
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

    case fromActions.CountriesActionTypes.LOAD_ALL_COUNTRIES_MISSIONS: {
      return {
        ...state,
        loading: true,
        error: undefined
      };
    }

    case fromActions.CountriesActionTypes.LOAD_ALL_COUNTRIES_MISSIONS_SUCCESS: {
      const missionGroup = {};
      action.payload.data.forEach(x => {
        let mission = {...x.attributes};
        let country_id = 0;
        mission.changed = new Date(mission.changed * 1000);
        // Put this in another function.
        if (x.relationships.mission_image.data && Array.isArray(x.relationships.mission_image.data)) {
          const ids = x.relationships.mission_image.data.map(image => image.id);
          if (ids && ids.length > 0) {
            const image_ids = ids.map(id => action.payload.included.find(i => i.id === id).relationships.field_image.data.id);
            const images = image_ids.map(image_id => action.payload.included.find(i => i.id === image_id).attributes.url);
            // Keeping the mission_image for fallback.
            mission = {...mission, mission_images: images, mission_image: images[ 0 ]};
          }
        } else if (x.relationships.mission_image.data) {
          const id = x.relationships.mission_image.data.id;
          const image_id = action.payload.included.find(i => i.id === id).relationships.field_image.data.id;
          const image = action.payload.included.find(i => i.id === image_id).attributes.url;
          mission = {...mission, mission_image: image};
        }

        if (x.relationships.country.data) {
          const id = x.relationships.country.data.id;
          country_id = action.payload.included.find(i => i.id === id).attributes.tid;
          mission = {...mission, parent_id: country_id};
        }
        if (!missionGroup[country_id]) {
          missionGroup[country_id] = [];
        }
        missionGroup[country_id] = [...missionGroup[country_id], mission];
      });

      const countries = state.countries.map(x => {
        return {...x, missions: missionGroup[x.tid]};
      });

      return {
        ...state,
        loaded: true,
        loading: false,
        all_loaded: true,
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
        if (x.relationships.image.data) {
          const id = x.relationships.image.data.id;
          const image_id = action.payload.included.find(i => i.id === id).relationships.field_image.data.id;
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
