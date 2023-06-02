import { makeAutoObservable } from "mobx";
import { IAlertMessage } from "./Interfaces";

export default class AlertStore { 
	alertMsg: IAlertMessage = {
    msg: "",
    err: {},
  };
	constructor() {
    makeAutoObservable(this);
  }

	setAlertMsg(msgData: IAlertMessage) {
    this.alertMsg = { ...msgData };
  }

  clearAlertMsg() {
    this.alertMsg = { msg: "", err: {} };
  }
}