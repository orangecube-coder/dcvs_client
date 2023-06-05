import {
  FC,
  Fragment,
  useEffect,
  useState,
  useContext,
  ChangeEvent,
} from "react";
import { styled } from "@mui/material/styles";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import AlertMsg from "./AlertMsg";
import AddAreaForm from "./journal/AddAreaForm";
import AddNodeForm from "./journal/AddNodeForm";
import NodeTable from "./journal/NodeTable";
import AreaTable from "./journal/AreaTable";
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
  Share as ShareIcon,
  AutoAwesomeMotion as AutoAwesomeMotionIcon,
  AutoAwesomeMotionOutlined as AutoAwesomeMotionOutlinedIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { red, green } from "@mui/material/colors";

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

const Journal: FC = () => {
  const { journalStore } = useContext(Context);
  const [expandedAreas, setExpandedAreas] = useState<boolean>(true);
  const [expandedNodes, setExpandedNodes] = useState<boolean>(true);
  const [openAddAreaForm, setOpenAddAreaForm] = useState<boolean>(false);
  const [openAddNodeForm, setOpenAddNodeForm] = useState<boolean>(false);
  const [checkedAllAreas, setCheckedAllAreas] = useState<boolean>(false);
  const jsonSelectAreas = JSON.stringify(journalStore.selectAreas);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleExpandClickArea = () => {
    setExpandedAreas(!expandedAreas);
  };

  const handleExpandClickNode = () => {
    setExpandedNodes(!expandedNodes);
  };

  const handleCheckAllAreasClick = () => {
    journalStore.fillAreaCheckFilter(!checkedAllAreas);
  };

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    journalStore.searchAreaByName(e.target.value);
  };

  useEffect(() => {
    setCheckedAllAreas(false);
    journalStore.selectAreas.forEach((item) => {
      if (item) setCheckedAllAreas(true);
    });
  }, [journalStore.selectAreas, jsonSelectAreas]);

  return (
    <Fragment>
      <AlertMsg />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "auto" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <ZoomOutMapIcon />
                </Avatar>
              }
              title="ЗОНЫ"
              subheader={journalStore.areaStore.modedAreas.length + " items"}
              action={
                <Fragment>
                  <IconButton onClick={() => setShowSearch(!showSearch)}>
                    <SearchIcon color={showSearch ? "primary" : undefined} />
                  </IconButton>
                  <Checkbox
                    checked={checkedAllAreas}
                    onChange={handleCheckAllAreasClick}
                    icon={<AutoAwesomeMotionOutlinedIcon />}
                    checkedIcon={<AutoAwesomeMotionIcon />}
                  />
                  <IconButton onClick={() => setOpenAddAreaForm(true)}>
                    <PlaylistAddIcon color="primary" />
                  </IconButton>
                  <ExpandMore
                    expand={expandedAreas}
                    onClick={handleExpandClickArea}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Fragment>
              }
            ></CardHeader>
            <Collapse in={expandedAreas}>
              <CardContent>
                {showSearch && (
                  <TextField
                    autoFocus
                    fullWidth
                    label={"Поиск"}
                    size="small"
                    onChange={changeSearchHandler}
                  />
                )}
                <AreaTable />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "auto" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                  <ShareIcon />
                </Avatar>
              }
              title="УЗЛЫ"
              subheader={journalStore.nodeStore.modedNodes.length + " items"}
              action={
                <Fragment>
                  <IconButton onClick={() => setOpenAddNodeForm(true)}>
                    <PlaylistAddIcon color="primary" />
                  </IconButton>
                  <ExpandMore
                    expand={expandedNodes}
                    onClick={handleExpandClickNode}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Fragment>
              }
            >
              <ExpandMore expand={expandedNodes}>
                <ExpandMoreIcon />
              </ExpandMore>
            </CardHeader>
            <Collapse in={expandedNodes}>
              <CardContent>
                <NodeTable />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
      {openAddAreaForm && (
        <AddAreaForm
          open={openAddAreaForm}
          onClose={() => {
            setOpenAddAreaForm(false);
          }}
        />
      )}
      {openAddNodeForm && (
        <AddNodeForm
          open={openAddNodeForm}
          onClose={() => {
            setOpenAddNodeForm(false);
          }}
        />
      )}
    </Fragment>
  );
};

export default observer(Journal);
