import { FC, Fragment, useState, useContext, useEffect } from "react";
import { INode } from "../../../store/Interfaces";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
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
	const { journalStore } = useContext(Context);
  const [openDeleteNodeForm, setOpenDeleteNodeForm] = useState<boolean>(false);
  const [openEditNodeForm, setOpenEditNodeForm] = useState<boolean>(false);
	const [checked, setChecked] = useState<boolean>(false);
	const jsonSelectNodes = JSON.stringify(journalStore.selectNodes);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    journalStore.addNodeCheckFilter(node._id, event.target.checked);
  };

	useEffect(() => {
    setChecked(journalStore.selectNodes.get(node._id));
  }, [node._id, jsonSelectNodes, journalStore]);

  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={node.value}
          secondary={node.area.value}
          sx={{ mr: 1 }}
        />
				<Checkbox checked={checked} onChange={handleCheck} />
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

export default observer(NodeItem);
