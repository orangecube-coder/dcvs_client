import { IArea } from "../Interfaces";
import { runInAction, makeAutoObservable } from "mobx";
import $api from "../Interceptors";
import AlertStore from "../AlertStore";

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

  async getAllAreas() {
    const response = await $api.get<IArea[]>("/journal/areas");
    this.areas = response.data;
    runInAction(() => this.selectAreas.clear());
    this.fillAreaCheckFilter(true);
    this.fillAreaSearchFilter(true);
  }

  fillAreaCheckFilter(value: boolean) {
    this.areas.forEach((area) => {
      runInAction(() => this.selectAreas.set(area._id, value));
    });
  }

  fillAreaSearchFilter(value: boolean) {
    this.areas.forEach((area) => {
      runInAction(() => this.searchAreas.set(area._id, value));
    });
    this.applyAreaSearchFilter();
  }

  applyAreaSearchFilter() {
    this.modedAreas = this.areas.filter((area) =>
      this.searchAreas.get(area._id)
    );
  }

  addAreaSearchFilter(area_id: string, finded: boolean) {
    runInAction(() => {
      if (finded) {
        this.searchAreas.set(area_id, true);
      } else this.searchAreas.set(area_id, false);
    });
    this.applyAreaSearchFilter();
  }

  searchAreaByName(value: string) {
    this.modedAreas = this.areas.filter(
      (area) =>
        area.value.toLowerCase().includes(value.toLowerCase()) ||
        area.description.toLowerCase().includes(value.toLowerCase())
    );
  }

  addAreaCheckFilter(area_id: string, checked: boolean) {
    runInAction(() => {
      if (checked) {
        this.selectAreas.set(area_id, true);
      } else this.selectAreas.set(area_id, false);
    });
  }

  async addArea(value: string, description: string) {
    try {
      const response = await $api.post("/journal/addarea", {
        value,
        description,
      });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllAreas();
      });
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }

  async editArea(area: IArea, value: string, description: string) {
    try {
      const response = await $api.post("/journal/editarea", {
        area,
        value,
        description,
      });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllAreas();
      });
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }

  async delArea(area: IArea) {
    try {
      const response = await $api.post("/journal/delarea", { area });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllAreas();
      });
      return true;
    } catch (err) {
			return this.alert.returnedError(err);
    }
  }
}
