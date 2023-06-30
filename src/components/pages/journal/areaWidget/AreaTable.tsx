import { FC, Fragment, useContext } from "react";
import { IArea } from "../../../../store/Interfaces";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { List } from "@mui/material";
import AreaItem from "./AreaItem";

const AreaTable: FC = () => {
  const { journalStore } = useContext(Context);

  return (
    <Fragment>
      <List dense>
        {journalStore.modedAreas.map((area: IArea) => (
          <AreaItem key={area._id} area={area} />
        ))}
      </List>
    </Fragment>
  );
};

export default observer(AreaTable);
