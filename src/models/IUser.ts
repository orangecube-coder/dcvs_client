export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	isActivated: boolean;
	_id: string;
	roles: string[];
	createdAt: string;
	updatedAt: string;
	lastLogin: string;
}