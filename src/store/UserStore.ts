import { AxiosError } from "axios";
import { runInAction, makeAutoObservable } from "mobx";
import AlertStore from "./AlertStore";
import $api from "./Interceptors";
import { IRole, IUser } from "./Interfaces";

export default class UserStore {
	alert: AlertStore;
	users: IUser[] = [];
	roles: IRole[] = [];
	userCount: number = 0;

  constructor(alert: AlertStore) {
		makeAutoObservable(this);
		this.alert = alert;
  }

	async getAllUsers() {
		const response = await $api.get<IUser[]>("/users");
		runInAction(() => {
			this.users = response.data
			this.userCount = this.users.length;
		});
	}

	async getAllRoles() {
		const response = await $api.get<IRole[]>("/roles");
		runInAction(() => this.roles = response.data);
	}

  async addUser(
    name: string,
    email: string,
    password: string
  ) {
    try {
      const response = await $api.post("/users/add", {
        name,
        email,
        password,
      });
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
				this.getAllUsers();
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

	async addUserRole(user: IUser, role: IRole) {
    try {
      const response = await $api.post("/users/addrole", {user, role});
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
				this.getAllUsers();
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

	async delUserRole(user: IUser, role: IRole) {
    try {
      const response = await $api.post("/users/delrole", {user, role});
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
				this.getAllUsers();
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

  async delUser(user: IUser) {
    try {
      const response = await $api.post("/users/del", {user});
      runInAction(() => {
        this.alert.alertMsg = { ...response.data.message };
				this.getAllUsers();
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
