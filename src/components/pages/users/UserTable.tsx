import { FC, useEffect, useState, Fragment, useContext } from "react";
import { IUser } from "../../../models/IUser";
import UserService from "../../../services/UserService";
import { Context } from "../../../index";
import AddUserForm from "./AddUserForm";
import AddRoleForm from "./AddRoleForm";
import moment from "moment-timezone";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  Box,
  Collapse,
  Button,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

export interface SimpleProps {
  getUpdate: () => void;
  user: IUser;
}

const FoldingItem: FC<SimpleProps> = (props) => {
  const { user, getUpdate } = props;
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);

  async function delUserRole(email: string, role: string) {
    store.delUserRole(email, role)
    	.then(() => { getUpdate() });
  }
  const delUser = (email: string) => {
  	store.delUser(email)
      .then(() => { getUpdate() });
  };

  return (
    <Fragment key={user.email}>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">
            {user.lastName} {user.firstName}
          </Typography>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="right"
          sx={{ display: { xs: "none", sm: "table-cell" } }}
        >
          <Typography
            color={user.isActivated ? "text.primary" : "text.disabled"}
          >
            {user.email}
          </Typography>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="right"
          sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
        >
          {moment(user.lastLogin)
            .tz("Europe/Moscow")
            .format("HH:mm DD.MM.YYYY")}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => delUser(user.email)}
          >
            Удалить
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box sx={{ display: { xs: "block", sm: "none" }, ml: 2, mt: 1 }}>
                <Typography variant="subtitle2">Email: </Typography>
                <Typography
                  color={user.isActivated ? "text.primary" : "text.disabled"}
                  variant="body2"
                >
                  {user.email}
                </Typography>
              </Box>
              <Box sx={{ display: { sm: "block", md: "none" }, ml: 2, mt: 1 }}>
                <Typography variant="subtitle2">Последний вход: </Typography>
                <Typography variant="body2">
                  {moment(user.updatedAt)
                    .tz("Europe/Moscow")
                    .format("HH:mm DD.MM.YYYY")}
                </Typography>
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Роли</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.roles.map((role: any) => (
                    <TableRow key={role}>
                      <TableCell component="th" scope="row">
                        {role}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => delUserRole(user.email, role)}
                        >
                          Удалить
                        </Button>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => {
                  setOpenAddRole(true);
                }}
                sx={{ mt: 1 }}
              >
                Добавить роль
              </Button>
              <AddRoleForm
                key={user._id}
                open={openAddRole}
                email={user.email}
                username={user.lastName + " " + user.firstName}
                onClose={() => {
                  setOpenAddRole(false);
                }}
                onUpdate={() => {
                  getUpdate();
                }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const UserTable: FC = () => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const res = await UserService.fetchUsers();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Имя</TableCell>
            <TableCell
              align="right"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Email
            </TableCell>
            <TableCell
              align="right"
              sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
            >
              Последний вход
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <FoldingItem
              key={user.email}
              user={user}
              getUpdate={() => getUsers()}
            />
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => setOpenAddUser(true)}
        >
          Добавить пользователя
        </Button>
      </Box>
      <AddUserForm
        open={openAddUser}
        onClose={() => {
          setOpenAddUser(false);
        }}
        onUpdate={() => {
          getUsers();
        }}
      />
    </Fragment>
  );
};

export default UserTable;
