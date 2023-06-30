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
import NodeTable from "./NodeTable";
import AddNodeForm from "./AddNodeForm";
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
  Share as ShareIcon,
  AutoAwesomeMotion as AutoAwesomeMotionIcon,
  AutoAwesomeMotionOutlined as AutoAwesomeMotionOutlinedIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";

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

const NodeWidget: FC = () => {
  const { journalStore } = useContext(Context);
  const [expandedNodes, setExpandedNodes] = useState<boolean>(false);
  const jsonSelectNodes = JSON.stringify(journalStore.selectNodes);
  const [openAddNodeForm, setOpenAddNodeForm] = useState<boolean>(false);
  const [checkedAllNodes, setCheckedAllNodes] = useState<boolean>(false);
  const [showNodeSearch, setShowNodeSearch] = useState<boolean>(false);

  const handleExpandClickNode = () => {
    setExpandedNodes(!expandedNodes);
  };

  const handleShowNodeSearchClick = () => {
    setShowNodeSearch(!showNodeSearch);
    if (!showNodeSearch) setExpandedNodes(true);
  };

  const changeNodeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setExpandedNodes(true);
    journalStore.searchNodeByName(e.target.value);
  };

  const handleCheckAllNodesClick = () => {
    journalStore.fillNodeCheckFilter(!checkedAllNodes);
  };

  useEffect(() => {
    setCheckedAllNodes(false);
    journalStore.selectNodes.forEach((item) => {
      if (item) setCheckedAllNodes(true);
    });
  }, [journalStore.selectNodes, jsonSelectNodes]);

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ width: "auto" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
              <ShareIcon />
            </Avatar>
          }
          title="УЗЛЫ"
          subheader={
            "Найдено узлов: " + journalStore.nodeStore.modedNodes.length
          }
          action={
            <Fragment>
              <IconButton onClick={handleShowNodeSearchClick}>
                <SearchIcon color={showNodeSearch ? "primary" : undefined} />
              </IconButton>
              <Checkbox
                checked={checkedAllNodes}
                onChange={handleCheckAllNodesClick}
                icon={<AutoAwesomeMotionOutlinedIcon />}
                checkedIcon={<AutoAwesomeMotionIcon />}
              />
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
            {showNodeSearch && (
              <TextField
                autoFocus
                fullWidth
                label={"Поиск"}
                size="small"
                onChange={changeNodeSearchHandler}
              />
            )}
            <NodeTable />
          </CardContent>
        </Collapse>
      </Card>
      {openAddNodeForm && (
        <AddNodeForm
          open={openAddNodeForm}
          onClose={() => {
            setOpenAddNodeForm(false);
          }}
        />
      )}
    </Grid>
  );
};

export default observer(NodeWidget);
