import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IWard, defaultValue } from 'app/shared/model/ward.model';

export const ACTION_TYPES = {
  SEARCH_WARDS: 'ward/SEARCH_WARDS',
  FETCH_WARD_LIST: 'ward/FETCH_WARD_LIST',
  FETCH_WARD: 'ward/FETCH_WARD',
  CREATE_WARD: 'ward/CREATE_WARD',
  UPDATE_WARD: 'ward/UPDATE_WARD',
  DELETE_WARD: 'ward/DELETE_WARD',
  RESET: 'ward/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWard>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type WardState = Readonly<typeof initialState>;

// Reducer

export default (state: WardState = initialState, action): WardState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_WARDS):
    case REQUEST(ACTION_TYPES.FETCH_WARD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_WARD):
    case REQUEST(ACTION_TYPES.UPDATE_WARD):
    case REQUEST(ACTION_TYPES.DELETE_WARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_WARDS):
    case FAILURE(ACTION_TYPES.FETCH_WARD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WARD):
    case FAILURE(ACTION_TYPES.CREATE_WARD):
    case FAILURE(ACTION_TYPES.UPDATE_WARD):
    case FAILURE(ACTION_TYPES.DELETE_WARD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_WARDS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_WARD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_WARD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_WARD):
    case SUCCESS(ACTION_TYPES.UPDATE_WARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_WARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/wards';
const apiSearchUrl = SERVER_API_URL + '/api/_search/wards';

// Actions

export const getSearchEntities: ICrudSearchAction<IWard> = query => ({
  type: ACTION_TYPES.SEARCH_WARDS,
  payload: axios.get<IWard>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IWard> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WARD_LIST,
  payload: axios.get<IWard>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IWard> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WARD,
    payload: axios.get<IWard>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IWard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WARD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WARD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWard> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WARD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
