import { IUser } from "../IUser";

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	message: {
		msg: string;
		err: object;
	}
	user: IUser;
}