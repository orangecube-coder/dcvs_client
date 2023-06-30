import { FC, Fragment } from "react";
import AlertMsg from "./AlertMsg";
import AreaWidget from "./journal/areaWidget/AreaWidget";
import NodeWidget from "./journal/nodeWidget/NodeWidget";
import JournalWidget from "./journal/journalWidget/JournalWidget";
import { Grid } from "@mui/material";

const Journal: FC = () => {
  return (
    <Fragment>
      <AlertMsg />
      <Grid container spacing={1}>
        <AreaWidget />
        <NodeWidget />
				<JournalWidget />
      </Grid>
    </Fragment>
  );
};

export default Journal;
