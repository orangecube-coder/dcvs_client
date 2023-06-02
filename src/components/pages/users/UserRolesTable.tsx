import { FC, Fragment, useState } from "react";
import { IRole, IUser } from "../../../store/Interfaces";
import { Chip, Stack } from "@mui/material";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import AddRoleForm from "./AddRoleForm";
import RoleItem from "./RoleItem";

interface Props {
  user: IUser;
}

const UserRolesTable: FC<Props> = (props) => {
  const { user } = props;
  const [openAddRoleForm, setOpenAddRoleForm] = useState<boolean>(false);

  return (
    <Fragment>
      <Stack direction="row" spacing={0} sx={{ flexWrap: "wrap" }}>
        {user.roles.map((role: IRole) => (
          <RoleItem key={role._id} user={user} role={role} />
        ))}
        <Chip
          color="primary"
          sx={{ ml: 1, mb: 1 }}
          label={"Добавить роль"}
          icon={<AddCircleIcon />}
          variant="outlined"
          onClick={() => setOpenAddRoleForm(true)}
        />
        {openAddRoleForm && (
          <AddRoleForm
            open={openAddRoleForm}
            user={user}
            onClose={() => setOpenAddRoleForm(false)}
          />
        )}
      </Stack>
    </Fragment>
  );
};

export default UserRolesTable;
