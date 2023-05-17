import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { grey } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
// Modal mui end
import { useSearchParams } from "react-router-dom";

import i18n from "../18n";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../hooks/useDebounce";
import { getTitles } from "../store/crudReducer";
import { useSelector } from "react-redux";
import { getUser } from "../store/authReducer";
import { RootState } from "../store";
const settings = [
  { Label: "Registr", path: "/registr", key: 1 },
  { Label: "Login", path: "/login", key: 2 },
  { Label: "Profile", path: "/profileShedule", key: 3 },
];
const pages = [{ Label: "CreateTitle", path: "createTitle", key: 4 }];
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // custom
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  // i18n
  // select category
  const [selectCategory, setSelectCategory] = React.useState("");

  const handleSC = (event: SelectChangeEvent) => {
    setSelectCategory(event.target.value as string);
  };
  // mui search

  // search
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  useEffect(() => {
    setSearchParams({
      q: search,
    });
    localStorage.setItem("page", JSON.stringify(1));
  }, [search]);

  useEffect(() => {
    dispatch(getTitles());
  }, [searchParams]);
  const fetchByParams = (query: string, value: string) => {
    const search = new URLSearchParams(window.location.search);

    if (value === "all") {
      search.delete(query);
    } else {
      search.set(query, value);
    }

    const url = `${window.location.pathname}?${search.toString()}`;

    navigate(url);
    localStorage.setItem("page", JSON.stringify(1));
  };
  // auth

  let userDefaultImg =
    "https://64.media.tumblr.com/39bb2fa785ac13040df6de6f441b8056/c56f154af6673db3-77/s1280x1920/2e2c66494c5d67b26744a2c926277b093cdea292.png";
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log(user);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="AppBarToolbar">
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((item) => (
              <MenuItem key={item.key} onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.Label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}> */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {/* </Box> */}
          <MenuBookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("Logo")}
          </Typography>

          <MenuBookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("Logo")}
          </Typography>

          <div>
            <Button>
              <LanguageIcon onClick={handleOpen} />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ListItemButton onClick={() => changeLanguage("ru")}>
                  <ListItemText primary="Русский" />
                </ListItemButton>
                <ListItemButton onClick={() => changeLanguage("en")}>
                  <ListItemText primary="English" />
                </ListItemButton>
              </Box>
            </Modal>
          </div>
          <div className="search-box">
            <input
              type="text"
              name=""
              className="search-txt"
              placeholder="Type to search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <a className="search-btn" href="#">
              <i className="fa fa-search" aria-hidden="true"></i>
            </a>
          </div>
          <FormControl className="NavbarSelectBlock">
            <InputLabel id="demo-simple-select-label">Category </InputLabel>
            <Select
              className="NavbarSelect"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectCategory}
              label="Category"
              onChange={handleSC}
            >
              <MenuItem
                value={10}
                onClick={() => {
                  navigate("/");
                  setSelectCategory("Manga");
                  fetchByParams("category", "Manga");
                }}
              >
                Manga
              </MenuItem>
              <MenuItem
                value={20}
                onClick={() => {
                  navigate("/");
                  setSelectCategory("Manga");
                  fetchByParams("category", "manhua");
                }}
              >
                Manhua
              </MenuItem>
              <MenuItem
                value={30}
                onClick={() => {
                  navigate("/");
                  setSelectCategory("Manga");
                  fetchByParams("category", "Manhwa");
                }}
              >
                Manhwa
              </MenuItem>
              <MenuItem
                value={40}
                onClick={() => {
                  navigate("/");
                  setSelectCategory("Manga");
                  fetchByParams("category", "Comics");
                }}
              >
                Comics
              </MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Зарегистрироваться">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user.img.length == 0 ? (
                  <img
                    src={user.img}
                    alt=""
                    width="50px"
                    height="50px"
                    style={{ borderRadius: "360%" }}
                  />
                ) : (
                  <img
                    src={userDefaultImg}
                    alt=""
                    width="50px"
                    height="50px"
                    style={{ borderRadius: "360%" }}
                  />
                )}
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.key}
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate(setting.path);
                  }}
                >
                  <Typography textAlign="center">{t(setting.Label)}</Typography>
                </MenuItem>
              ))}
              <Typography
                textAlign="center"
                className="LogoutTypography"
                onClick={() => {
                  localStorage.removeItem("userId");
                }}
              >
                <LogoutIcon />
                Выход
              </Typography>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
