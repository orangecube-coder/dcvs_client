import { INode } from "./Interfaces";
import { AxiosError } from "axios";
import $api from "./Interceptors";
import { makeAutoObservable } from "mobx";
import AlertStore from "./AlertStore";

export default class NodeStore {
	alert: AlertStore;
  nodes: INode[] =[];
  selectNodes: Map<any, any> = new Map();
	modedNodes: INode[] = [];

  constructor(alert: AlertStore) {
		makeAutoObservable(this);
		this.alert = alert;
  }

}
