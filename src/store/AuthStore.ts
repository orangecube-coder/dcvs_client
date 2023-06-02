import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import $api, { API_URL } from "./Interceptors";
import { IAuthResponse, IUser } from "./Interfaces";

export default class AuthStore { 
	user: IUser = {} as IUser;
  isAuth: boolean = false;
  isLoading: boolean = false;
  isFetchError: boolean = false;
	
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

	setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await $api.post<IAuthResponse>("/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
			
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: string = err.response?.data.message;
        return error;
      }
    }
  }

	async logout() {
    try {
      await $api.post("/logout");
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (err) {
      console.log(err);
    }
  }

	async checkAuth() {
    try {
      this.setLoading(true);
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  }
}
