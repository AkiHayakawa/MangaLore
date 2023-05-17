import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Popover from "@mui/material/Popover";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import { useAppDispatch } from "../../hooks/useDebounce";
import {
  editTitle,
  getProductDetails,
  postTitle,
} from "../../store/crudReducer";
import { useSelector } from "react-redux";

const EditTitle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);
  //   getTitleRootState
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
    rating?: number[];
    id: string;
    chapters?: any;
  };
  type CrudState = {
    titleDetails: Title;
  };
  interface RootState {
    crud: CrudState;
  }
  const getTitle = useSelector((state: RootState) => state.crud.titleDetails);
  //   getTitleRootState end
  const allGenres = [
    "Приключения",
    "Боевик",
    "Комедия",
    "Повседневность",
    "Романтика",
    "Драма",
    "Фантастика",
    "Фэнтези",
    "Мистика",
    "Детектив",
    "Триллер",
    "Психология",
  ];
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [genres, setgenres] = useState<string[]>([]);
  const [img, setImg] = useState("");
  const [backroundImg, setBackroundImg] = useState("");
  const [author, setAuthor] = useState("");
  const [artist, setArtist] = useState("");
  const [publisher, setPublisher] = useState("");
  const [dateRelease, setDateRelease] = useState("");
  let words = description;
  const joinGenre = (ganre: string) => {
    if (!genres.includes(ganre)) {
      setgenres((oldArray) => [...oldArray, ganre]);
    } else {
      let myIndex = genres.indexOf(ganre);

      if (myIndex !== -1) {
        genres.splice(myIndex, 1);
      }
    }
  };
  const RedactTite = () => {
    if (
      title.length > 60 ||
      subTitle.length > 60 ||
      words.length < 80 ||
      !category ||
      !genres ||
      !img ||
      !backroundImg ||
      !author ||
      !artist ||
      !publisher ||
      !dateRelease
    ) {
      alert("Все поля обязаны быть правильно заполнены");
    } else {
      let Title = {
        title: title,
        sub_title: subTitle,
        description: description,
        category: category,
        genres: genres,
        img: img,
        backroundImg: backroundImg,
        author: author,
        artist: artist,
        publisher: publisher,
        dateRelease: dateRelease,
        rating: getTitle.rating,
        id: Number(id),
        tap: "",
        chapters: getTitle.chapters,
      };
      dispatch(editTitle(Title));
      navigate("/");
    }
  };
  const [openSub_Category, setOpenSub_Category] = React.useState(false);
  const handleClickSub_category = () => {
    setOpenSub_Category(!openSub_Category);
  };
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
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const [load, setLoad] = useState(false);
  const [loadstate, setLoadstate] = useState(true);
  const state = () => {
    if (loadstate == true) {
      return (
        setTitle(getTitle.title),
        setSubTitle(getTitle.sub_title),
        setDescription(getTitle.description),
        setCategory(getTitle.category),
        setgenres(getTitle.genres),
        setImg(getTitle.img),
        setBackroundImg(getTitle.backroundImg),
        setAuthor(getTitle.author),
        setArtist(getTitle.artist),
        setPublisher(getTitle.publisher),
        setDateRelease(getTitle.dateRelease)
      );
    }
  };
  setTimeout(() => {
    setLoad(true);
    if (getTitle.description == undefined) {
      console.log("max");
    } else {
      state();
      setLoadstate(false);
    }
  }, 2000);
  return (
    <>
      {getTitle.description ? (
        <div className="CreateCourseContainer">
          <h2>Опубликуйте свой тайтл</h2>
          <div className="CreateCourseBlock">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Изменения будут отклонятся по следующим причинам: - Если тайтл
                относится к не подходящим для сайта жанрам: хентай, бара,
                сётакон; - Если это додзинси/синглы, которые имеют жанр: яой /
                юри / эротика
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Спасибо за сотрудничество
              </Typography>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Введите заголовок тайтла
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* .length > 60 */}
                      {title.length > 60 ? (
                        <>
                          {" "}
                          <Alert severity="warning">
                            (максимум 60 символов)
                          </Alert>
                        </>
                      ) : (
                        <>(максимум 60 символов)</>
                      )}
                    </InputAdornment>
                  }
                  label="Введите заголовок тайтла "
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Вставьте подзаголовок
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={subTitle}
                  onChange={(e) => {
                    setSubTitle(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* .length > 60  */}
                      {subTitle.length > 60 ? (
                        <>
                          {" "}
                          <Alert severity="warning">
                            (максимум 60 символов)
                          </Alert>
                        </>
                      ) : (
                        <>(максимум 60 символов)</>
                      )}
                    </InputAdornment>
                  }
                  label="Введите заголовок "
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Вставьте описание тайтла
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      {/* .length > 80 */}
                      {words.length > 80 ? (
                        <> (минимум 80 слов)</>
                      ) : (
                        <>
                          {" "}
                          <Alert severity="warning"> (минимум 80 слов)</Alert>
                        </>
                      )}
                    </InputAdornment>
                  }
                  label="Введите описание тайтла "
                />
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Жанры "
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={genres}
                onClick={() => handleClickSub_category()}
              />

              <div className="AddCourseImgBlock">
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Обложка "
                    variant="outlined"
                    value={img}
                    onChange={(e) => {
                      setImg(e.target.value);
                    }}
                  />
                  <div className="AddCourseImgBlockImg">
                    <Paper elevation={3}>
                      {img ? (
                        <img
                          src={img}
                          alt="fail"
                          width="224px"
                          height="350px"
                        />
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={224}
                          height={350}
                        ></Skeleton>
                      )}{" "}
                    </Paper>
                  </div>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Фон "
                    variant="outlined"
                    value={backroundImg}
                    onChange={(e) => {
                      setBackroundImg(e.target.value);
                    }}
                  />
                  <div className="AddCourseImgBlockImg">
                    <Paper elevation={3}>
                      {backroundImg ? (
                        <img src={backroundImg} alt="fail" width="224px" />
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={224}
                          height={350}
                        ></Skeleton>
                      )}{" "}
                    </Paper>
                  </div>
                </div>
                <div className="AddCourseCategoryBlock">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Категория
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="category"
                      onChange={handleChange}
                    >
                      <MenuItem
                        onClick={() => {
                          setCategory("Manga");
                        }}
                        value={"Manga"}
                      >
                        Manga
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setCategory("manhua");
                        }}
                        value={"manhua"}
                      >
                        manhua
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setCategory("Manhwa");
                        }}
                        value={"Manhwa"}
                      >
                        Manhwa
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setCategory("Comics");
                        }}
                        value={"Comics"}
                      >
                        Comics
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Author"
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="художник"
                    variant="outlined"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label=" Издатель"
                    variant="outlined"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Дата релиза"
                    variant="outlined"
                    value={dateRelease}
                    onChange={(e) => setDateRelease(e.target.value)}
                  />{" "}
                  <Modal
                    open={openSub_Category}
                    onClose={handleClickSub_category}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {allGenres.map((sub_category) => (
                        <ListItemButton>
                          <ListItemText
                            primary={sub_category}
                            onClick={() => {
                              joinGenre(sub_category);
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </Box>
                  </Modal>
                </div>
              </div>
              <div className="CreateTitleButton">
                {" "}
                <Button
                  onClick={() => {
                    RedactTite();
                  }}
                  variant="contained"
                >
                  Редактировать тайтл
                </Button>
              </div>
            </Box>
          </div>
        </div>
      ) : (
        <h2>Sorry</h2>
      )}
    </>
  );
};

export default EditTitle;
