import { FC, Fragment } from "react";
import UserTable from "./users/UserTable";
import { Grid, Paper, Typography } from "@mui/material";
import AlertMsg from "./AlertMsg";

const Users: FC = () => {
  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={8} overflow="hidden">
          <AlertMsg />
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Пользователи
            </Typography>
            <UserTable />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Users;
