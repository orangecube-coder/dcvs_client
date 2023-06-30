import { makeAutoObservable } from "mobx";
import AlertStore from "./AlertStore";
import { INode, IArea, IRecord, IUser } from "./Interfaces";
import NodeStore from "./journalStore/NodeStore";
import AreaStore from "./journalStore/AreaStore";
import RecordStore from "./journalStore/RecordlStore";

export default class JournalStore {
  alert: AlertStore;
  nodeStore: NodeStore;
  areaStore: AreaStore;
	recordStore: RecordStore;

  constructor(alert: AlertStore, nodeStore: NodeStore, areaStore: AreaStore, recordStore: RecordStore) {
    makeAutoObservable(this);
    this.alert = alert;
    this.nodeStore = nodeStore;
    this.areaStore = areaStore;
		this.recordStore = recordStore;
  }

	get records() {
		return this.recordStore.records;
	}

	get selectRecords() {
    return this.recordStore.selectRecords;
  }

  get modedRecords() {
    return this.recordStore.modedRecords;
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
		await this.getAllRecords();
  }

  async getAllRecords() {
		await this.recordStore.getAllRecords();
  }

	async addRecord(node: INode, user: IUser, timestamp: number, description: string) {
    return await this.recordStore.addRecord(node, user, timestamp, description); 
  }

  async delRecord(record: IRecord) {
    return await this.recordStore.delRecord(record);
  }

  async editRecord(record: IRecord, value: string, description: string) {
    return await this.recordStore.editRecord(record, value, description);
  }

	fillRecordCheckFilter(value: boolean) {
    this.recordStore.fillRecordCheckFilter(value);
  }

  addRecordCheckFilter(record_id: string, checked: boolean) {
    this.recordStore.addRecordCheckFilter(record_id, checked);
  }

  searchRecord(value: string) {
    this.recordStore.searchRecord(value);
  }

	sortRecords(order: string, orderBy: string) {
		this.recordStore.sortRecords(order, orderBy);
	}

  async getAllAreas() {
    await this.areaStore.getAllAreas();
  }

  async addArea(value: string, description: string) {
    return await this.areaStore.addArea(value, description);
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
