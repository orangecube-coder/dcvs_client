import { AxiosError } from "axios";
import { runInAction, makeAutoObservable } from "mobx";
import AlertStore from "./AlertStore";
import $api from "./Interceptors";
import { INode, IArea } from "./Interfaces";
import NodeStore from "./NodeStore";
import AreaStore from "./AreaStore";

export default class JournalStore {
  alert: AlertStore;
  areas: IArea[] = [];
  nodes: INode[] = [];
  selectAreas = new Map();
	searchAreas = new Map();
  modedNodes: INode[] = [];
	modedAreas: IArea[] = [];
	nodeStore: NodeStore;
	areaStore: AreaStore;

  constructor(alert: AlertStore, nodeStore: NodeStore, areaStore: AreaStore) {
    makeAutoObservable(this);
    this.alert = alert;
		this.nodeStore = nodeStore;
		this.areaStore = areaStore;
  }

  async addAreaCheckFilter(area_id: string, checked: boolean) {
    runInAction(() => {
      if (checked) {
        this.selectAreas.set(area_id, true);
      } else this.selectAreas.set(area_id, false);
      this.applyNodeByAreaCheckFilter();
    });
  }

  async addAreaSearchFilter(area_id: string, finded: boolean) {
    runInAction(() => {
      if (finded) {
        this.searchAreas.set(area_id, true);
      } else this.searchAreas.set(area_id, false);
      this.applyAreaSearchFilter();
    });
  }

	fillAreaSearchFilter(value: boolean) {
    runInAction(() => {
      this.areas.forEach((area) => {
        this.searchAreas.set(area._id, value);
      });
      this.applyAreaSearchFilter();
    });
  }

  async applyAreaSearchFilter() {
    this.modedAreas = this.areas.filter((area) =>
      this.searchAreas.get(area._id)
    );
  }

  searchAreaByName(value: string) {
    this.modedAreas = this.areas.filter(
      (area) =>
        area.value.toLowerCase().includes(value.toLowerCase()) ||
        area.description.toLowerCase().includes(value.toLowerCase())
    );
  }

  async applyNodeByAreaCheckFilter() {
    this.modedNodes = this.nodes.filter((node) =>
      this.selectAreas.get(node.area._id)
    );
  }

	fillAreaCheckFilter(value: boolean) {
    runInAction(() => {
      this.areas.forEach((area) => {
        this.selectAreas.set(area._id, value);
      });
      this.applyNodeByAreaCheckFilter();
    });
  }

  async getAllNodes() {
    const response = await $api.get<INode[]>("/journal/nodes");
    runInAction(() => {
      this.nodes = response.data;
			this.applyNodeByAreaCheckFilter();
    });
  }

	async getAllAreas() {
    const response = await $api.get<IArea[]>("/journal/areas");
    runInAction(() => {
      this.areas = response.data;
      this.selectAreas.clear();
      this.fillAreaCheckFilter(true);
      this.fillAreaSearchFilter(true);
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