import { FC, Fragment, useState } from "react";
import { INode } from "../../../store/Interfaces";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import DeleteNodeForm from "./DeleteNodeForm";
import EditNodeForm from "./EditNodeForm";

interface Props {
  node: INode;
}

const NodeItem: FC<Props> = (props) => {
  const { node } = props;
  const [openDeleteNodeForm, setOpenDeleteNodeForm] = useState<boolean>(false);
  const [openEditNodeForm, setOpenEditNodeForm] = useState<boolean>(false);

  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={node.value}
          secondary={node.area.value}
          sx={{ mr: 1 }}
        />
        <IconButton
          edge="end"
          color="primary"
          onClick={() => setOpenEditNodeForm(true)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          color="error"
          onClick={() => setOpenDeleteNodeForm(true)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </ListItem>
      {openDeleteNodeForm && (
        <DeleteNodeForm
          open={openDeleteNodeForm}
          onClose={() => setOpenDeleteNodeForm(false)}
          node={node}
        />
      )}
      {openEditNodeForm && (
        <EditNodeForm
          open={openEditNodeForm}
          onClose={() => setOpenEditNodeForm(false)}
          node={node}
        />
      )}
    </Fragment>
  );
};

export default NodeItem;
