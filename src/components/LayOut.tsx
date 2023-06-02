import { FC, useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Context } from "../";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Index from "./pages/Index";
import DashBoard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import Journal from "./pages/Journal";
import { AuthPreloader, UsersPreloader, JournalPreloader } from "./Preloaders";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  Container,
  Link,
  Avatar,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import SideNav from "./SideNav";
import AlertMsg from "./pages/AlertMsg";

const drawerWidth = 240;
const mdTheme = createTheme();

const LayOut: FC = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(false);
  const { authStore } = useContext(Context);

  useEffect(() => {
    const handleResize = (event: any) => {
      if (event.target.innerWidth < 768) {
        setMode(true);
      } else {
        setMode(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <AlertMsg />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="absolute"
          sx={{
            ...(!mode && {
              width: `calc(100% - calc(${mdTheme.spacing(7)} + 1px))`,
              transition: mdTheme.transitions.create(["width", "margin"], {}),
              ...(open && {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
              }),
            }),
          }}
        >
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              sx={{ marginRight: "36px" }}
            >
              {mode ? (
                <MenuIcon />
              ) : !open ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* {mode ? "True" : "False"} */}
            </Typography>
            <IconButton color="inherit" onClick={() => authStore.logout()}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          variant={mode ? "temporary" : "permanent"}
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              transition: mdTheme.transitions.create(["width", "margin"], {}),
              ...(mode && { width: drawerWidth }),
              ...(!mode && {
                ...(!open && { width: `calc(${mdTheme.spacing(7)} + 1px)` }),
                ...(open && { width: drawerWidth }),
              }),
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              px: [1],
            }}
          >
            <Avatar>{authStore.user.name[0]}</Avatar>
            {open ? (
              <Typography noWrap={true} variant="h6" sx={{ mx: 1 }}>
                {authStore.user.name}
              </Typography>
            ) : (
              ""
            )}
          </Toolbar>
          <Divider />
          <SideNav open={open} />
        </Drawer>
        <Box
          component="main"
          sx={{
            ...(!mode && {
              transition: mdTheme.transitions.create("padding", {}),
              ...(!open && { ml: `calc(${mdTheme.spacing(7)} + 1px)` }),
              ...(open && { ml: drawerWidth + "px" }),
            }),
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Routes>
              <Route path="/404" element={<NotFound />} />
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route element={<JournalPreloader />}>
                <Route path="/journal" element={<Journal />} />
              </Route>
              <Route element={<AuthPreloader allowedRoles={["ADMIN"]} />}>
                <Route element={<UsersPreloader />}>
                  <Route path="/getusers" element={<Users />} />
                </Route>
              </Route>
            </Routes>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ pt: 4 }}
            >
              {"Copyright © "}
              <Link color="inherit" href="https://mui.com/">
                Your Website
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LayOut;
