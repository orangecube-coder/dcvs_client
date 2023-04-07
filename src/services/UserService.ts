import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../models/IUser";
import { IRole } from "../models/IRole";
// import { AuthResponse } from "../models/response/AuthResponse";

export default class UserService {
	static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>("/users");
	}
	static async fetchAllRoles(): Promise<AxiosResponse<IRole[]>> {
		return $api.get<IRole[]>("/roles");
	}
	static async addUserRole(email: string, role: string): Promise<AxiosResponse> {
		return $api.post("/users/addrole", {email, role});
	}
	static async delUserRole(email: string, role: string): Promise<AxiosResponse> {
		return $api.post("/users/delrole", {email, role});
	}
	static async addUser(firstName: string, lastName: string, email: string, password: string): Promise<AxiosResponse> {
		return $api.post("/users/add", {firstName, lastName, email, password});
	}
	static async delUser(email: string): Promise<AxiosResponse> {
		return $api.post("/users/del", {email});
	}
}