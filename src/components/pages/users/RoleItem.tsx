import { FC, Fragment, useState } from "react";
import { IUser, IRole } from "../../../store/Interfaces";
import { Chip } from "@mui/material";
import DeleteRoleForm from "./DeleteRoleForm";

interface Props {
  user: IUser;
  role: IRole;
}

const RoleItem: FC<Props> = (props) => {
  const { user, role } = props;
  const [openDeleteRoleForm, setOpenDeleteRoleForm] = useState<boolean>(false);
  return (
    <Fragment>
      <Chip
        sx={{
          "& .MuiChip-deleteIcon: hover": {
            color: "rgb(211, 47, 47)",
          },
          "& .MuiChip-deleteIcon": {
            color: "rgba(211, 47, 47, .7)",
          },
          mb: 1,
          ml: 1,
        }}
        label={role.value}
        variant="outlined"
        onDelete={() => setOpenDeleteRoleForm(true)}
      />
      {openDeleteRoleForm && (
        <DeleteRoleForm
          open={openDeleteRoleForm}
          onClose={() => setOpenDeleteRoleForm(false)}
          user={user}
          role={role}
        />
      )}
    </Fragment>
  );
};

export default RoleItem;
