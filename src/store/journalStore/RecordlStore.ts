import { IRecord, INode, IUser } from "../Interfaces";
import { runInAction, makeAutoObservable } from "mobx";
import $api from "../Interceptors";
import moment from "moment-timezone";
import AlertStore from "../AlertStore";

export default class RecordStore {
  alert: AlertStore;
  records: IRecord[] = [];
  selectRecords: Map<any, any> = new Map();
  modedRecords: IRecord[] = [];
  searchRecords: Map<any, any> = new Map();

  constructor(alert: AlertStore) {
    makeAutoObservable(this);
    this.alert = alert;
  }

  async getAllRecords() {
    const response = await $api.get<IRecord[]>("/journal/records");
    this.records = response.data;
    runInAction(() => this.selectRecords.clear());
    this.fillRecordCheckFilter(true);
    this.fillRecordSearchFilter(true);
  }

  fillRecordCheckFilter(value: boolean) {
    this.records.forEach((record) => {
      runInAction(() => this.selectRecords.set(record._id, value));
    });
  }

  fillRecordSearchFilter(value: boolean) {
    this.records.forEach((record) => {
      runInAction(() => this.searchRecords.set(record._id, value));
    });
    this.applyRecordSearchFilter();
  }

  applyRecordSearchFilter() {
    this.modedRecords = this.records.filter((record) =>
      this.searchRecords.get(record._id)
    );
  }

  addRecordSearchFilter(record_id: string, finded: boolean) {
    runInAction(() => {
      if (finded) {
        this.searchRecords.set(record_id, true);
      } else this.searchRecords.set(record_id, false);
    });
    this.applyRecordSearchFilter();
  }

  searchRecord(value: string) {
    this.modedRecords = this.records.filter((record) =>
      record.description.toLowerCase().includes(value.toLowerCase()) ||
			record._id.includes(value.toLowerCase()) ||
			record.node.value.toLowerCase().includes(value.toLowerCase()) ||
			record.node.area.value.toLowerCase().includes(value.toLowerCase()) ||
			record.user.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  addRecordCheckFilter(record_id: string, checked: boolean) {
    runInAction(() => {
      if (checked) {
        this.selectRecords.set(record_id, true);
      } else this.selectRecords.set(record_id, false);
    });
  }

  async addRecord(
    node: INode,
    user: IUser,
    timestamp: number,
    description: string
  ) {
    try {
      const response = await $api.post("/journal/addrecord", {
        node,
        user,
        timestamp,
        description,
      });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllRecords();
      });
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }

  async editRecord(record: IRecord, value: string, description: string) {
    try {
      const response = await $api.post("/journal/editrecord", {
        record,
        value,
        description,
      });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllRecords();
      });
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }

  async delRecord(record: IRecord) {
    try {
      const response = await $api.post("/journal/delrecord", { record });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
        this.getAllRecords();
      });
      return true;
    } catch (err) {
      return this.alert.returnedError(err);
    }
  }

  descendingComparator(a: string, b: string) {
    return b < a ? -1 : b > a ? 1 : 0;
  }

  sortRecords(order: string, orderBy: string) {
    this.modedRecords.sort((a: IRecord, b: IRecord) => {
      const item: { [key: string]: (elem: IRecord) => string } = {
        _id: (elem: IRecord) => elem._id,
        node: (elem: IRecord) => elem.node.value,
        area: (elem: IRecord) => elem.node.area.value,
        user: (elem: IRecord) => elem.user.name,
        date: (elem: IRecord) =>
          moment(elem.timestamp).tz("Europe/Moscow").format("DD.MM.YYYY HH:mm"),
      };
      return order === "desc"
        ? this.descendingComparator(item[orderBy](a), item[orderBy](b))
        : -this.descendingComparator(item[orderBy](a), item[orderBy](b));
    });
  }
}
