import { IArea } from "./Interfaces";
import { AxiosError } from "axios";
import $api from "./Interceptors";
import { makeAutoObservable } from "mobx";
import AlertStore from "./AlertStore";

export default class AreaStore {
	alert: AlertStore;
  areas: IArea[] = [];
  selectAreas: Map<any, any> = new Map();
  modedAreas: IArea[] = [];
  searchAreas = new Map();

  constructor(alert: AlertStore) {
    makeAutoObservable(this);
		this.alert = alert;
  }

}
