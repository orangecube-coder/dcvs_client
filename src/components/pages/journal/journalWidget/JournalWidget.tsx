import {
  FC,
  Fragment,
  useContext,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/material/styles";
import JournalTable from "./JournalTable";
import AddRecordForm from "./AddRecordForm";
import {
  Avatar,
  Card,
  Checkbox,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  TextField,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  PlaylistAdd as PlaylistAddIcon,
  ZoomOutMap as ZoomOutMapIcon,
  AutoAwesomeMotion as AutoAwesomeMotionIcon,
  AutoAwesomeMotionOutlined as AutoAwesomeMotionOutlinedIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const JournalWidget: FC = () => {
  const { journalStore } = useContext(Context);
  const [expandedJournal, setExpandedJournal] = useState<boolean>(true);
  const jsonSelectRecords = JSON.stringify(journalStore.selectRecords);
  const [openAddRecordForm, setOpenAddRecordForm] = useState<boolean>(false);
  const [checkedAllRecords, setCheckedAllRecords] = useState<boolean>(false);
  const [showRecordSearch, setShowRecordSearch] = useState<boolean>(false);

  const handleExpandClickJournal = () => {
    setExpandedJournal(!expandedJournal);
  };

  const handleShowRecordSearchClick = () => {
    setShowRecordSearch(!showRecordSearch);
    if (!showRecordSearch) setExpandedJournal(true);
  };

  const changeRecordSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    journalStore.searchRecord(e.target.value);
  };

  const handleCheckAllRecordsClick = () => {
    journalStore.fillRecordCheckFilter(!checkedAllRecords);
  };

  useEffect(() => {
    setCheckedAllRecords(false);
    journalStore.selectRecords.forEach((item) => {
      if (item) setCheckedAllRecords(true);
    });
  }, [journalStore.selectRecords, jsonSelectRecords]);

  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ width: "auto" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              <ZoomOutMapIcon />
            </Avatar>
          }
          title="СОБЫТИЯ"
          subheader={"Событий: " + journalStore.modedRecords.length}
          action={
            <Fragment>
              <IconButton onClick={handleShowRecordSearchClick}>
                <SearchIcon color={showRecordSearch ? "primary" : undefined} />
              </IconButton>
              <Checkbox
                checked={checkedAllRecords}
                onChange={handleCheckAllRecordsClick}
                icon={<AutoAwesomeMotionOutlinedIcon />}
                checkedIcon={<AutoAwesomeMotionIcon />}
              />
              <IconButton onClick={() => setOpenAddRecordForm(true)}>
                <PlaylistAddIcon color="primary" />
              </IconButton>
              <ExpandMore
                expand={expandedJournal}
                onClick={handleExpandClickJournal}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Fragment>
          }
        ></CardHeader>
        <Collapse in={expandedJournal}>
          <CardContent>
            {showRecordSearch && (
              <TextField
                autoFocus
                fullWidth
                label={"Поиск"}
                size="small"
                onChange={changeRecordSearchHandler}
              />
            )}
						{/* <EnhancedTable /> */}
            <JournalTable />
          </CardContent>
        </Collapse>
      </Card>
      {openAddRecordForm && (
        <AddRecordForm
          open={openAddRecordForm}
          onClose={() => {
            setOpenAddRecordForm(false);
          }}
        />
      )}
    </Grid>
  );
};

export default observer(JournalWidget);
