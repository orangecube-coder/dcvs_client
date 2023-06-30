export interface IAlertMessage {
  state?: string;
  msg: string;
  err: any;
}

export interface IUser {
  name: string;
  email: string;
  isActivated: boolean;
  _id: string;
  roles: IRole[];
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRole {
  _id: string;
  value: string;
}

export interface IArea {
  _id: string;
  value: string;
	description: string;
  createdAt: string;
  updatedAt: string;
}

export interface INode {
  _id: string;
  value: string;
	area: IArea;
}

export interface IRecord {
  _id: string;
  node: INode;
	user: IUser;
	timestamp: Date;
	description: string;
}