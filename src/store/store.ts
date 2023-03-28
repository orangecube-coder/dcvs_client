import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

export default class Store {
	user = {} as IUser;
	isAuth = false;
	isLoading = true;
	isFetchError = false;
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
	setFetchError(bool: boolean) {
		this.isFetchError = bool;
	}
	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (err) {
			if (err instanceof AxiosError) {
				const error: string = err.response?.data.message
				return error;
			}
		}
	}
	async registration(firstName: string, lastName: string, email: string, password: string) {
		try {
			const response = await AuthService.registration(firstName, lastName, email, password);
			return response.data.message;
		} catch (err) {
			if (err instanceof AxiosError) {
				const error: string = err.response?.data.message
				return {
					state: "error",
					msg: error,
					err
				}
			}
		}
	}
	async logout() {
		try {
			await AuthService.logout();
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
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			console.log(error);
		} finally {
			this.setLoading(false);
		}
	}
	async addUserRole(email: string, role: string) {
		try {
			const response = await UserService.addUserRole(email, role);
			return response.data.message;
		} catch (err) {
			if (err instanceof AxiosError) {
				const error: string = err.response?.data.message
				return {
					state: "error",
					msg: error,
					err
				}
			}
		}
	}
	async delUserRole(email: string, role: string) {
		try {
			const response = await UserService.delUserRole(email, role);
			return response.data.message;
		} catch (err) {
			if (err instanceof AxiosError) {
				const error: string = err.response?.data.message
				return {
					state: "error",
					msg: error,
					err
				}
			}
		}
	}
}