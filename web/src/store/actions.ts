import IAction from "./action.interface";
import { Store } from "./storeinfo/storeinfo.interface";
import { District } from "./districts/district.interface";
import { City } from "./cities/city.interface";
import { INotification } from "../sagas/notification";

export const GET_STORE_FROM_API = 'GET_STORE_FROM_API';
export const SET_STORE = 'SET_STORE';
export const SAVE_STORE = 'SAVE_STORE';

export const GET_DISTRICTS_FROM_API = 'GET_DISTRICTS_FROM_API';
export const SET_DISTRICTS = 'SET_DISTRICTS';

export const GET_CITIES_FROM_API = 'GET_CITIES_FROM_API';
export const SET_CITIES = 'SET_CITIES';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

export function getStoreFromApi(storeId: string): IAction {
  return { type: GET_STORE_FROM_API, payload: { storeId } }
}

export function setStore(store: Store): IAction {
  return { type: SET_STORE, payload: store }
}

export function saveStore(store: Store): IAction {
  return { type: SAVE_STORE, payload: store }
}

export function getDistrictsFromApi(cityId: string): IAction {
  return { type: GET_DISTRICTS_FROM_API, payload: { cityId } }
}

export function setDistricts(cityId: string, districts: District[]) {
  return { type: SET_DISTRICTS, payload: { cityId, districts } }
}

export function getCitiesFromApi(): IAction {
  return { type: GET_CITIES_FROM_API  , payload: null }
}

export function setCities(cities: City[]): IAction {
  return { type: SET_CITIES, payload: cities }
}

export function showNotification(data: INotification): IAction {
  return { type: SHOW_NOTIFICATION, payload: data }
}