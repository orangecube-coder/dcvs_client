import { FC, Fragment, useState, useContext, useEffect } from "react";
import { IArea } from "../../../store/Interfaces";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { IconButton, ListItem, ListItemText, Checkbox } from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import DeleteAreaForm from "./DeleteAreaForm";
import EditAreaForm from "./EditAreaForm";

interface Props {
  area: IArea;
}

const AreaItem: FC<Props> = (props) => {
  const { area } = props;
  const { journalStore } = useContext(Context);
  const [openDeleteAreaForm, setOpenDeleteAreaForm] = useState<boolean>(false);
  const [openEditAreaForm, setOpenEditAreaForm] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
	const jsonSelectAreas = JSON.stringify(journalStore.selectAreas);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    journalStore.addAreaFilter(area._id, event.target.checked);
  };

  useEffect(() => {
    setChecked(journalStore.selectAreas.get(area._id));
  }, [area._id, jsonSelectAreas, journalStore]);

  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={area.value}
          secondary={area.description}
          sx={{ mr: 1 }}
        />
        <Checkbox checked={checked} onChange={handleCheck} />
        <IconButton
          edge="end"
          color="primary"
          onClick={() => setOpenEditAreaForm(true)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          color="error"
          onClick={() => setOpenDeleteAreaForm(true)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </ListItem>
      {openDeleteAreaForm && (
        <DeleteAreaForm
          open={openDeleteAreaForm}
          onClose={() => setOpenDeleteAreaForm(false)}
          area={area}
        />
      )}
      {openEditAreaForm && (
        <EditAreaForm
          open={openEditAreaForm}
          onClose={() => setOpenEditAreaForm(false)}
          area={area}
        />
      )}
    </Fragment>
  );
};

export default observer(AreaItem);
