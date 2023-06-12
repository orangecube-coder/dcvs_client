import { makeAutoObservable } from "mobx";
import AlertStore from "./AlertStore";
import { INode, IArea } from "./Interfaces";
import NodeStore from "./NodeStore";
import AreaStore from "./AreaStore";

export default class JournalStore {
  alert: AlertStore;
  nodeStore: NodeStore;
  areaStore: AreaStore;

  constructor(alert: AlertStore, nodeStore: NodeStore, areaStore: AreaStore) {
    makeAutoObservable(this);
    this.alert = alert;
    this.nodeStore = nodeStore;
    this.areaStore = areaStore;
  }

  get areas() {
    return this.areaStore.areas;
  }

  get selectAreas() {
    return this.areaStore.selectAreas;
  }

  get modedAreas() {
    return this.areaStore.modedAreas;
  }

  get nodes() {
    return this.nodeStore.nodes;
  }

	get selectNodes() {
    return this.nodeStore.selectNodes;
  }

  get modedNodes() {
    return this.nodeStore.modedNodes;
  }

  async preloadJournal() {
    await this.getAllAreas();
    await this.getAllNodes();
  }

  async getAllAreas() {
    await this.areaStore.getAllAreas();
  }

  async addArea(areaName: string, areaDescription: string) {
    return await this.areaStore.addArea(areaName, areaDescription);
  }

  async delArea(area: IArea) {
    return await this.areaStore.delArea(area);
  }

  async editArea(area: IArea, value: string, description: string) {
    return await this.areaStore.editArea(area, value, description);
  }

  fillAreaCheckFilter(value: boolean) {
    this.areaStore.fillAreaCheckFilter(value);
    this.nodeStore.applyNodeByAreaCheckFilter(this.selectAreas);
  }

  addAreaCheckFilter(area_id: string, checked: boolean) {
    this.areaStore.addAreaCheckFilter(area_id, checked);
    this.nodeStore.applyNodeByAreaCheckFilter(this.selectAreas);
  }

  searchAreaByName(value: string) {
    this.areaStore.searchAreaByName(value);
  }

  async getAllNodes() {
    await this.nodeStore.getAllNodes();
    this.nodeStore.applyNodeByAreaCheckFilter(this.selectAreas);		
  }

  async addNode(nodeName: string, area: IArea) {
    return await this.nodeStore.addNode(nodeName, area);
  }

  async delNode(node: INode) {
    return await this.nodeStore.delNode(node);
  }
  
	async editNode(node: INode, value: string, area: IArea) {
    return await this.nodeStore.editNode(node, value, area);
  }

	fillNodeCheckFilter(value: boolean) {
    this.nodeStore.fillNodeCheckFilter(value);
  }

	addNodeCheckFilter(node_id: string, checked: boolean) {
    this.nodeStore.addNodeCheckFilter(node_id, checked);
  }

  searchNodeByName(value: string) {
    this.nodeStore.searchNodeByName(value);
  }
}
