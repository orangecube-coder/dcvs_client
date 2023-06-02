import { AxiosError } from "axios";
import { runInAction, makeAutoObservable } from "mobx";
import AlertStore from "./AlertStore";
import $api from "./Interceptors";
import { INode, IArea } from "./Interfaces";

export default class JournalStore {
  alert: AlertStore;
  areas: IArea[] = [];
  nodes: INode[] = [];
  selectAreas = new Map();
  modedNodes: INode[] = [];

  constructor(alert: AlertStore) {
    makeAutoObservable(this);
    this.alert = alert;
  }

  async addAreaFilter(area_id: string, checked: boolean) {
    runInAction(() => {
      if (checked) {
        this.selectAreas.set(area_id, true);
      } else this.selectAreas.set(area_id, false);
      this.applyAreaFilter();
    });
  }

  async applyAreaFilter() {
    this.modedNodes = this.nodes.filter((node) =>
      this.selectAreas.get(node.area._id)
    );
  }

  fillAreaFilter(value: boolean) {
    runInAction(() => {
      this.areas.forEach((area) => {
        this.selectAreas.set(area._id, value);
      });
      this.applyAreaFilter();
    });
  }

  async getAllNodes() {
    const response = await $api.get<INode[]>("/journal/nodes");
    runInAction(() => {
      this.nodes = response.data;
      this.modedNodes.concat(this.nodes);
			this.applyAreaFilter();
    });
  }

  async getAllAreas() {
    const response = await $api.get<IArea[]>("/journal/areas");
    runInAction(() => {
      this.areas = response.data;
      this.selectAreas.clear();
      this.fillAreaFilter(true);
    });
  }

  async addNode(nodeName: string, area: IArea) {
    try {
      const response = await $api.post("/journal/addnode", { nodeName, area });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllNodes();
      });
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: string = err.response?.data.message;
        runInAction(() => {
          this.alert.alertMsg = {
            state: "error",
            msg: error,
            err,
          };
        });
        return false;
      }
    }
  }

  async addArea(areaName: string, areaDescription: string) {
    try {
      const response = await $api.post("/journal/addarea", {
        areaName,
        areaDescription,
      });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllAreas();
      });
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: string = err.response?.data.message;
        runInAction(() => {
          this.alert.alertMsg = {
            state: "error",
            msg: error,
            err,
          };
        });
        return false;
      }
    }
  }

  async delNode(node: INode) {
    try {
      const response = await $api.post("/journal/delnode", { node });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllNodes();
      });
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: string = err.response?.data.message;
        runInAction(() => {
          this.alert.alertMsg = {
            state: "error",
            msg: error,
            err,
          };
        });
        return false;
      }
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
      if (err instanceof AxiosError) {
        const error: string = err.response?.data.message;
        runInAction(() => {
          this.alert.alertMsg = {
            state: "error",
            msg: error,
            err,
          };
        });
        return false;
      }
    }
  }

  async editArea(area: IArea) {
    try {
      const response = await $api.post("/journal/editarea", { area });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllAreas();
      });
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: string = err.response?.data.message;
        runInAction(() => {
          this.alert.alertMsg = {
            state: "error",
            msg: error,
            err,
          };
        });
        return false;
      }
    }
  }
}
