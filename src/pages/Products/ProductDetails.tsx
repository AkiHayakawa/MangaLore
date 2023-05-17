import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useDebounce";
import { UpdateOneElement, getProductDetails } from "../../store/crudReducer";
import { useNavigate, useParams } from "react-router-dom";
// mui
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import Rating from "@mui/material/Rating";
import GradeIcon from "@mui/icons-material/Grade";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import ListIcon from "@mui/icons-material/List";
import BallotIcon from "@mui/icons-material/Ballot";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import GradingIcon from "@mui/icons-material/Grading";
import { addTap } from "../../store/authReducer";
const actions = [
  {
    icon: <AutoStoriesIcon />,
    name: "read",
  },
  {
    icon: <CollectionsBookmarkIcon />,
    name: "abandoned",
  },
  {
    icon: <FolderDeleteIcon />,
    name: "intheplans",
  },
  {
    icon: <BookmarkAddIcon />,
    name: "favorite",
  },
  {
    icon: <GradingIcon />,
    name: "readed",
  },
];

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  type Chapters = {
    tom: string;
    chapter: {
      number: string;
      pages: string[];
    };
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
    id: string;
  };
  type CrudState = {
    titleDetails: Title;
  };
  interface RootState {
    crud: CrudState;
  }
  const title = useSelector((state: RootState) => state.crud.titleDetails);

  const { id } = useParams();
  // mui
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const items = document.querySelectorAll(".DetailsBackround");

  for (let index = 0; index < items.length; index++) {
    if (items[index]) {
      (
        items[index] as HTMLElement
      ).style.backgroundImage = `url(${title.backroundImg})`;
    }
  }

  useEffect(() => {
    setDescripteBoolean(true);
  }, []);

  const [descripteBoolean, setDescripteBoolean] = useState(true);
  const [raiting, setRaiting] = React.useState<number | null>(5);
  let sum: number = 0;
  if (title.rating) {
    for (let i = 0; i < title.rating.length; i++) {
      sum += title.rating[i];
    }
    sum = sum / title.rating.length;
  }
  const PushRating = (newValue: any) => {
    let upRating = title.rating?.concat([newValue]);
    dispatch(
      UpdateOneElement({
        id: title.id,
        key: "rating",
        update: upRating,
      })
    );
  };

  // comments
  type Comment = {
    user: string;
    comment: string;
    Allcomments: Comment[];
    date: string;
  };
  // user

  return (
    <>
      {title.description ? (
        <div className="DetailsPage">
          <div className="DetailsBackround">
            <div className="DetailsBackroundBack"></div>
          </div>

          <div className="DetailsPageContainer">
            {title ? (
              <div className="DetailsImgBlock">
                <div className="DetailsImgInfoBlock">
                  {" "}
                  <div>
                    <Paper elevation={3} className="DetailsCardPaper">
                      <img
                        src={title.img}
                        alt=""
                        width="250px"
                        height="350px"
                      />
                      <div className="EditIcon">
                        <Box
                          sx={{
                            // height: 320,
                            transform: "translateZ(0px)",
                            flexGrow: 1,
                          }}
                        >
                          <SpeedDial
                            ariaLabel="SpeedDial controlled open example"
                            sx={{
                              position: "absolute",
                              width: 30,
                              height: 20,
                              bottom: 6,
                              left: 13,
                            }}
                            icon={<ListIcon />}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            open={open}
                          >
                            {actions.map((action) => (
                              <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={<h3>{action.name}</h3>}
                                onClick={() => {
                                  setOpen(false);
                                  dispatch(
                                    addTap({
                                      tap: action.name,
                                      id: String(title.id),
                                    })
                                  );
                                }}
                              />
                            ))}
                          </SpeedDial>
                        </Box>
                        <Tooltip
                          title={
                            <h3 className="textWhite">
                              Редактирование информации о тайтле
                            </h3>
                          }
                        >
                          <BorderColorIcon
                            onClick={() =>
                              navigate(`/product/edit/${title.id}`)
                            }
                            style={{
                              color: "#1976d2",
                              marginRight: "20px",
                              marginBottom: "5px",
                            }}
                          />
                        </Tooltip>
                      </div>
                    </Paper>
                  </div>
                  <div
                    className="textWhite StartReadingBlock"
                    onClick={() => {
                      navigate(`/product/read/${id}/${1}/${1}`);
                    }}
                  >
                    <p> Начать читать</p>
                  </div>
                  <div className="DetailsImgInfoBlockInfo">
                    <div className="textWhite infolistMini">Тип</div>
                    <div className="textWhite infolistNormal">
                      {title.category}
                    </div>
                    <div className="textWhite infolistMini">Дата Релиза</div>
                    <div className="textWhite infolistNormal">
                      {" "}
                      {title.dateRelease}
                    </div>{" "}
                    <div className="textWhite infolistMini">Автор</div>
                    <div className="textWhite infolistNormal">
                      {" "}
                      {title.author}
                    </div>{" "}
                    <div className="textWhite infolistMini">Художник</div>
                    <div className="textWhite infolistNormal">
                      {" "}
                      {title.artist}
                    </div>{" "}
                    <div className="textWhite infolistMini">Издатель</div>
                    <div className="textWhite infolistNormal">
                      {" "}
                      {title.publisher}
                    </div>
                  </div>
                </div>
                <div className="DetailsInfoContainer">
                  <div className="DetailsInfoTitle">
                    <div>
                      {" "}
                      <h2 className="textWhite obvod">{title.title}</h2>
                      <p className="textWhite obvod">{title.sub_title}</p>
                    </div>
                    <div className="Raiting">
                      {" "}
                      <Tooltip
                        onMouseEnter={() => setRaiting(sum)}
                        title={
                          <>
                            {" "}
                            <Typography
                              className="textWhite"
                              component="legend"
                            >
                              Оценить тайтл
                            </Typography>
                            <Rating
                              name="simple-controlled"
                              value={raiting}
                              max={10}
                              onChange={(event, newValue) => {
                                setRaiting(newValue);
                                PushRating(newValue);
                              }}
                            />
                          </>
                        }
                        placement="bottom"
                      >
                        <Typography
                          className=" ratingTextBlock"
                          component="legend"
                        >
                          <GradeIcon color="primary" />
                          <h3 className="textWhite">{sum.toFixed(1)}</h3>
                          <h4>{title.rating?.length}</h4>
                        </Typography>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="DetailsInfoBlock">
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                        >
                          <Tab label="Info" {...a11yProps(0)} />
                          <Tab label="Главы" {...a11yProps(1)} />
                          <Tab label="Обсуждения" {...a11yProps(2)} />
                        </Tabs>
                      </Box>
                      <TabPanel value={value} index={0}>
                        {descripteBoolean ? (
                          <h3 className="textWhite">
                            {title.description.slice(0, 480)}
                            ...
                            <p
                              className="blueColor"
                              onClick={() => setDescripteBoolean(false)}
                            >
                              Смотреть больше
                            </p>
                          </h3>
                        ) : (
                          <h3 className="textWhite">
                            {title.description}
                            <p
                              className="blueColor"
                              onClick={() => setDescripteBoolean(true)}
                            >
                              Скрыть
                            </p>
                          </h3>
                        )}

                        {title.genres ? (
                          title.genres.map((item) => (
                            <a className="genresItem">{item}</a>
                          ))
                        ) : (
                          <p></p>
                        )}
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <h4 className="textWhite"></h4>
                        <h4 className="textWhite">
                          {/* {title.chapters.map((item) => (
                            <div
                              className="TomChapterBlock"
                              onClick={() => navigate("/product/read")}
                            >
                              <p>Том {item.name} </p>{" "}
                              <p> глава {item.chapter1.name}</p>
                            </div>
                          ))} */}
                          {title.chapters?.map((item) => (
                            <div
                              className="TomChapterBlock"
                              onClick={() =>
                                navigate(
                                  `/product/read/${id}/${item.tom}/${item.chapter.number}`
                                )
                              }
                            >
                              <p className="CursorEffect">Том {item.tom} </p>{" "}
                              <p className="CursorEffect">
                                {" "}
                                глава {item.chapter.number}
                              </p>
                            </div>
                          ))}
                        </h4>
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <h4 className="textWhite">коментарии</h4>
                      </TabPanel>
                    </Box>
                  </div>
                </div>
              </div>
            ) : (
              <div>failed</div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductDetails;
