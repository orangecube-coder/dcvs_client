import { FC, Fragment, useContext } from "react";
import { INode } from "../../../../store/Interfaces";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { List } from "@mui/material";
import NodeItem from "./NodeItem";

const NodeTable: FC = () => {
  const { journalStore } = useContext(Context);
	
  return (
    <Fragment>
      <List dense>
        {journalStore.modedNodes.map((node: INode) => {
          return <NodeItem key={node._id} node={node} />;
        })}
      </List>
    </Fragment>
  );
};

export default observer(NodeTable);
