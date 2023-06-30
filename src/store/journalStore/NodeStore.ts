import { INode, IArea } from "../Interfaces";
import $api from "../Interceptors";
import { runInAction, makeAutoObservable } from "mobx";
import AlertStore from "../AlertStore";

export default class NodeStore {
  alert: AlertStore;
  nodes: INode[] = [];
  selectNodes: Map<any, any> = new Map();
  modedNodes: INode[] = [];
  searchNodes = new Map();

  constructor(alert: AlertStore) {
    makeAutoObservable(this);
    this.alert = alert;
  }

  async getAllNodes() {
    const response = await $api.get<INode[]>("/journal/nodes");
    this.nodes = response.data;
    runInAction(() => {
      this.selectNodes.clear();
    });
    this.fillNodeCheckFilter(true);
    this.fillNodeSearchFilter(true);
  }

  applyNodeByAreaCheckFilter(selectAreas: Map<any, any>) {
    this.modedNodes = this.nodes.filter((node) =>
      selectAreas.get(node.area._id)
    );
  }

  fillNodeCheckFilter(value: boolean) {
    this.nodes.forEach((node) => {
      runInAction(() => this.selectNodes.set(node._id, value));
    });
  }

  fillNodeSearchFilter(value: boolean) {
    this.nodes.forEach((node) => {
      runInAction(() => this.searchNodes.set(node._id, value));
    });
    this.applyNodeSearchFilter();
  }

  applyNodeSearchFilter() {
    this.modedNodes = this.nodes.filter((node) =>
      this.searchNodes.get(node._id)
    );
  }

  addNodeSearchFilter(node_id: string, finded: boolean) {
    runInAction(() => {
      if (finded) {
        this.searchNodes.set(node_id, true);
      } else this.searchNodes.set(node_id, false);
    });
    this.applyNodeSearchFilter();
  }

  searchNodeByName(value: string) {
    this.modedNodes = this.nodes.filter(
      (node) =>
        node.value.toLowerCase().includes(value.toLowerCase()) ||
        node.area.value.toLowerCase().includes(value.toLowerCase())
    );
  }
  addNodeCheckFilter(node_id: string, checked: boolean) {
    runInAction(() => {
      if (checked) {
        this.selectNodes.set(node_id, true);
      } else this.selectNodes.set(node_id, false);
    });
  }

  async addNode(value: string, area: IArea) {
    try {
      const response = await $api.post("/journal/addnode", { value, area });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllNodes();
      });
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }

  async editNode(node: INode, value: string, area: IArea) {
    try {
      const response = await $api.post("/journal/editnode", {
        node,
        value,
        area,
      });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllNodes();
      });
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }

  async delNode(node: INode) {
    try {
      const response = await $api.post("/journal/delnode", { node });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
      });
      this.getAllNodes();
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }
}
