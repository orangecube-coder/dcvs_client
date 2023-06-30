import { makeAutoObservable } from "mobx";
import { IAlertMessage } from "./Interfaces";
import { AxiosError } from "axios";

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

	returnedError(err: unknown) { ///???
		if (err instanceof AxiosError) {
			const error: string = err.response?.data.message;
			// runInAction(() => {
				this.alertMsg = {
					state: "error",
					msg: error,
					err,
				};
			// });
			return false;
		}
	}
}