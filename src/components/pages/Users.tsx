import { FC, Fragment, useState, useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import {
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import UsersTable from "./users/UsersTable";
import AddUserForm from "./users/AddUserForm";


const Users: FC = () => {
  const [openAddUserForm, setOpenAddUserForm] = useState<boolean>(false);
  const { userStore } = useContext(Context);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <UsersTable />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                АКТИВНОСТЬ
              </Typography>
              <Typography>Всего {userStore.userCount} пользователя</Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                onClick={() => setOpenAddUserForm(true)}
              >
                <PersonAddIcon />
              </IconButton>
              { openAddUserForm && <AddUserForm
                open={openAddUserForm}
                onClose={() => {
                  setOpenAddUserForm(false);
                }}
              />}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default observer(Users);
