import { FC, Fragment, useState, useContext, useEffect } from "react";
import { IRecord } from "../../../../store/Interfaces";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import moment from "moment-timezone";
import {
  IconButton,
  ListItem,
  ListItemText,
  Checkbox,
  TableRow,
  TableCell,
  Collapse,
  Typography,
  TableHead,
  Table,
  TableBody,
  Tooltip,
} from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
// import DeleteRecordForm from "./DeleteRecordForm";
// import EditRecordForm from "./EditRecordForm";
import AddRecordForm from "./AddRecordForm";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";
import { yellow } from "@mui/material/colors";

interface Props {
  record: IRecord;
}

const RecordItem: FC<Props> = (props) => {
  const { record } = props;
  const { journalStore } = useContext(Context);
  const [openDeleteRecordForm, setOpenDeleteRecordForm] =
    useState<boolean>(false);
  const [openEditRecordForm, setOpenEditRecordForm] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const jsonSelectRecords = JSON.stringify(journalStore.selectRecords);

  const [open, setOpen] = useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    journalStore.addRecordCheckFilter(record._id, event.target.checked);
  };

  useEffect(() => {
    setChecked(journalStore.selectRecords.get(record._id));
  }, [record._id, jsonSelectRecords, journalStore]);

  return (
    <Fragment>
      <TableRow onClick={() => setOpen(!open)} hover>
        <TableCell>
          {record._id.slice(0, 3)}...
          {record._id.slice(record._id.length - 3)}
        </TableCell>
        <TableCell>{record.node.area.value}</TableCell>
        <TableCell>{record.node.value}</TableCell>
        <TableCell>
          {moment(record.timestamp)
            .tz("Europe/Moscow")
            .format("DD.MM.YYYY HH:mm")}
        </TableCell>
        <TableCell>{record.user.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          sx={{ bgcolor: yellow[50] }}
          colSpan={5}
        >
          <Collapse in={open} timeout="auto">
            <Box sx={{ margin: 1 }}>{record.description}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default observer(RecordItem);
