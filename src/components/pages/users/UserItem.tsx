import { FC, Fragment, useState } from "react";
import { IUser } from "../../../store/Interfaces";
import moment from "moment-timezone";
import { observer } from "mobx-react-lite";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteUserForm from "./DeleteUserForm";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import UserRolesTable from "./UserRolesTable";

interface Props {
  user: IUser;
}

const UserItem: FC<Props> = (props) => {
  const { user } = props;
  const [expanded, setExpanded] = useState<string | false>(false);
  const [openDeleteUserForm, setOpenDeleteUserForm] = useState<boolean>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Fragment>
      <Accordion
        expanded={expanded === user._id}
        onChange={handleChange(user._id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>{user.name[0]}</Avatar>
            <Stack direction="column">
              <Typography noWrap={true} variant="body1" mr={2} fontWeight="500">
                {user.name}
              </Typography>
              <Typography noWrap={true} variant="body2" mr={2}>
                {user.email}{" "}
                {user.isActivated && (
                  <b style={{ color: "DodgerBlue" }}>&#9733;</b>
                )}
              </Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserRolesTable user={user} />
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Stack direction="column">
                  <Typography variant="subtitle2" mt={1}>
                    Дата создания:{" "}
                  </Typography>
                  <Typography variant="body2">
                    {moment(user.createdAt)
                      .tz("Europe/Moscow")
                      .format("HH:mm DD.MM.YYYY")}
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography variant="subtitle2" mt={1}>
                    Последний вход:{" "}
                  </Typography>
                  <Typography variant="body2">
                    {moment(user.updatedAt)
                      .tz("Europe/Moscow")
                      .format("HH:mm DD.MM.YYYY")}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                color="error"
                variant="text"
                onClick={() => setOpenDeleteUserForm(true)}
              >
                Удалить
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {openDeleteUserForm && (
        <DeleteUserForm
          open={openDeleteUserForm}
          onClose={() => setOpenDeleteUserForm(false)}
          user={user}
        />
      )}
    </Fragment>
  );
};

export default observer(UserItem);
