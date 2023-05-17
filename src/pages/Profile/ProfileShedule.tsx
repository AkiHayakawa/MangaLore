import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import ProfileNavbar from "./ProfileNavbar";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import { getUser } from "../../store/authReducer";
import { useAppDispatch } from "../../hooks/useDebounce";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { addTap } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";

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
const ProfileShedule = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  type NotificationType = {
    img?: string;
    title?: string;
    sub_title?: string;
    sender: string;
    date: string;
    alert: string;
    tap: string;
  };
  type tap = {
    [index: string]: any;
    read: string[];
    abandoned: string[];
    intheplans: string[];
    favorite: string[];
    readed: string[];
  };

  type User = {
    first_name: string;
    img: string;
    email: string;
    password: string;
    aboutMe: string;
    notification: string[];
    bookmarksTitle: tap;
    level?: string;
    friends: NotificationType[];
    comments: NotificationType[];
    otaku?: boolean;
    id?: number;
  };

  type Chapters = {
    chapters: string[];
  };
  type Title = {
    title: string;
    sub_title: string;
    description: string;
    category: string;
    genres: string[];
    img: string;
    backroundImg: string;
    author: string;
    artist: string;
    publisher: string;
    dateRelease: string;
    chapters?: Chapters[];
    rating?: number[];
    id?: number;
  };
  const [view, setView] = React.useState("List");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    setView(nextView);
  };
  let user: User = useSelector((state: RootState) => state.auth.user);
  const [model, setModel] = useState(true);
  let lists: Title[] = useSelector((state: RootState) => state.crud.list);
  const [selectTap, setSelectTap] = useState("all");
  const [selectTapId, setSelectTapId] = useState<string[]>([]);

  const getListbyTap = () => {
    if (selectTap == "all") {
      return lists;
    }
    return lists.filter((item) => {
      if (item.id) {
        return selectTapId.includes(String(item.id));
      }
    });
  };
  useEffect(() => {
    getListbyTap();
  }, [selectTap]);

  // useEffect(() => {
  //   console.log(Object.keys(user.bookmarksTitle));
  //   // Object.keys(user.bookmarksTitle).forEach((item: any) => {
  //   // console.log(item);
  //   // console.log(user.bookmarksTitle[item]);
  // }, []);
  console.log(user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [activeMenuTap, setActiveMenuTap] = useState(selectTap);
  return (
    <>
      {user.otaku ? (
        <div className="ProfileShedulePage">
          <ProfileNavbar />
          <div className="ProfileShedule">
            <div>
              {" "}
              <div className="ProfileSheduleList">
                {/* {Object.keys(user.bookmarksTitle).forEach((item) => {
                  console.log(item);
                  // do something with items[prop]
                })} */}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setSelectTap("all");
                      // setActiveMenuTap("all");
                    }}
                  >
                    <ListItemText inset primary={"all"} />
                  </ListItemButton>
                </ListItem>

                {Object.keys(user.bookmarksTitle).map((item) => (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        // getTab();
                        setSelectTap(item);
                        setSelectTapId(user.bookmarksTitle[item]);
                        // setActiveMenuTap(item);
                      }}
                    >
                      <ListItemText inset primary={item} />
                      <p className="bookmarksTitleLength ">
                        {user.bookmarksTitle[item].length}
                      </p>
                    </ListItemButton>
                  </ListItem>
                ))}
                {/* {user.bookmarksTitle.map((item) => (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        // getTab();
                        setSelectTap(Object.keys(item)[0]);
                        setSelectTapId(Object.values(item)[0]);
                      }}
                    >
                      <ListItemText inset primary={Object.keys(item)[0]} />
                      {Object.values(item)[0].length}
                    </ListItemButton>
                  </ListItem>
                ))} */}
              </div>
              <div className="ProfileSheduleView">
                <ToggleButtonGroup
                  orientation="vertical"
                  value={view}
                  exclusive
                  onChange={handleChange}
                >
                  <ToggleButton
                    value="List"
                    aria-label="list"
                    onClick={() => {
                      setModel(true);
                    }}
                  >
                    <ViewListIcon />
                    <p>Спикок</p>
                  </ToggleButton>
                  <ToggleButton
                    value="Tile"
                    aria-label="module"
                    onClick={() => {
                      setModel(false);
                    }}
                  >
                    <ViewModuleIcon />
                    <p>Плитка</p>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <div
              className={`ProfileListModel${model == true ? "List" : "Tile"}`}
            >
              <>
                {true ? (
                  <>
                    {getListbyTap().map((item) => (
                      <>
                        {model ? (
                          <div className="ProfileListBlockModelList">
                            <div
                              onClick={() =>
                                navigate(`/product/details/${item.id}`)
                              }
                            >
                              <img
                                src={item.img}
                                alt=""
                                className="ProfileListBlockModelListImg"
                              />
                            </div>
                            <div className="ProfileListBlockModelListText">
                              <p className="row">
                                {item.title} /{" "}
                                <p
                                  style={{ marginLeft: "5px" }}
                                  className="Color868e96"
                                >
                                  {" "}
                                  {item.sub_title}
                                </p>
                              </p>

                              <p>{item.artist}</p>
                              <p className="Color868e96">{item.publisher}</p>
                            </div>
                            <div className="ProfileListBlockModelListData">
                              <p className="Color868e96">Добавлено</p>
                              <p> {item.dateRelease}</p>
                            </div>

                            {/* <Button
                                className="ProfileListBlockModelListMore"
                                // onClick={handleOpen}
                              >
                                <p
                                  style={{
                                    marginTop: "-6px",
                                    marginBottom: "-2px",
                                  }}
                                >
                                  
                                </p>
                              </Button> */}
                            <div className="ActiveMenuTapBlock">
                              <Button
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                                style={{ textTransform: "lowercase" }}
                              >
                                {/* {activeMenuTap} */}
                                {selectTap}
                              </Button>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                {Object.keys(user.bookmarksTitle).map((tap) => (
                                  <MenuItem
                                    onClick={() => {
                                      setAnchorEl(null);
                                      // setActiveMenuTap(tap);
                                      setSelectTap(selectTap);
                                      dispatch(
                                        addTap({ tap, id: String(item.id) })
                                      );
                                    }}
                                  >
                                    {tap}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </div>
                            {/* <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    Text in a modal
                                  </Typography>
                                  <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                  >
                                    Duis mollis, est non commodo luctus, nisi
                                    erat porttitor ligula.
                                  </Typography>
                                </Box>
                              </Modal> */}
                          </div>
                        ) : (
                          <div className="ProfileListBlockModelTile">
                            <div className="ProfileListBlockModelTileImg">
                              <img
                                src={item.img}
                                alt=""
                                width="100%"
                                height="220px"
                                style={{ borderRadius: "4px" }}
                              />
                              <div className="ProfileListBlockModelTileBlockMoreStart">
                                <Button
                                  id="basic-button"
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={handleClick}
                                  className="ProfileListBlockModelTileBlockMore"
                                  style={{
                                    textTransform: "lowercase",
                                    fontSize: "x-large",
                                  }}
                                >
                                  {/* {activeMenuTap} */}
                                  {selectTap}
                                </Button>
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                >
                                  {Object.keys(user.bookmarksTitle).map(
                                    (tap) => (
                                      <MenuItem
                                        onClick={() => {
                                          setAnchorEl(null);
                                          // setActiveMenuTap(tap);
                                          setSelectTap(selectTap);
                                          dispatch(
                                            addTap({ tap, id: String(item.id) })
                                          );
                                        }}
                                      >
                                        {tap}
                                      </MenuItem>
                                    )
                                  )}
                                </Menu>
                                {/*                             
                                <p
                                  className="ProfileListBlockModelTileBlockMore"
                                >
                                  ...
                                </p> */}
                                <PlayCircleIcon className="ProfileListBlockModelListBlockIcon" />
                              </div>
                            </div>
                            <p>{item.title}</p>
                          </div>
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <h3 className="textWhite">Пусто</h3>
                )}
              </>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProfileShedule;
// {
//   "img": "https://rebrainme.com/blog/wp-content/uploads/2020/05/devops_books.jpg",
//   "title": "Истории Монстров",
//   "sub_title": "Bakemonogatari first",
//   "sender": "Последняя глава 101",
//   "date": "07.04.2023",
//   "alert": "Продолжить [12-100]",
//   "tap": "readed",
//   "id": 1000
// }
