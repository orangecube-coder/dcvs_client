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
import AreaTable from "./AreaTable";
import AddAreaForm from "./AddAreaForm";
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
import { red } from "@mui/material/colors";

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

const AreaWidget: FC = () => {
  const { journalStore } = useContext(Context);
  const [expandedAreas, setExpandedAreas] = useState<boolean>(false);
  const jsonSelectAreas = JSON.stringify(journalStore.selectAreas);
  const [openAddAreaForm, setOpenAddAreaForm] = useState<boolean>(false);
  const [checkedAllAreas, setCheckedAllAreas] = useState<boolean>(false);
  const [showAreaSearch, setShowAreaSearch] = useState<boolean>(false);

  const handleExpandClickArea = () => {
    setExpandedAreas(!expandedAreas);
  };

  const handleShowAreaSearchClick = () => {
    setShowAreaSearch(!showAreaSearch);
    if (!showAreaSearch) setExpandedAreas(true);
  };

  const changeAreaSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    journalStore.searchAreaByName(e.target.value);
  };

  const handleCheckAllAreasClick = () => {
    journalStore.fillAreaCheckFilter(!checkedAllAreas);
  };

  useEffect(() => {
    setCheckedAllAreas(false);
    journalStore.selectAreas.forEach((item) => {
      if (item) setCheckedAllAreas(true);
    });
  }, [journalStore.selectAreas, jsonSelectAreas]);

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ width: "auto" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <ZoomOutMapIcon />
            </Avatar>
          }
          title="ЗОНЫ"
          subheader={"Найдено зон: " + journalStore.modedAreas.length}
          action={
            <Fragment>
              <IconButton onClick={handleShowAreaSearchClick}>
                <SearchIcon color={showAreaSearch ? "primary" : undefined} />
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
            {showAreaSearch && (
              <TextField
                autoFocus
                fullWidth
                label={"Поиск"}
                size="small"
                onChange={changeAreaSearchHandler}
              />
            )}
            <AreaTable />
          </CardContent>
        </Collapse>
      </Card>
      {openAddAreaForm && (
        <AddAreaForm
          open={openAddAreaForm}
          onClose={() => {
            setOpenAddAreaForm(false);
          }}
        />
      )}
    </Grid>
  );
};

export default observer(AreaWidget);
