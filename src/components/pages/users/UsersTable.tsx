import { FC, Fragment, useContext } from "react";
import { Context } from "../../..";
import { IUser } from "../../../store/Interfaces";
import { observer } from "mobx-react-lite";
import UserItem from "./UserItem";

const UsersTable: FC = () => {
  const { userStore } = useContext(Context);

  return (
    <Fragment>
      {userStore.users.map((user: IUser) => (
        <UserItem key={user._id} user={user} />
      ))}
    </Fragment>
  );
};

export default observer(UsersTable);
