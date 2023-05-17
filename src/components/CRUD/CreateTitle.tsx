import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
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
import { postTitle } from "../../store/crudReducer";

const CreateTitle = () => {
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

  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleCloseCate = () => {
  //   setAnchorEl(null);
  // };
  const dispatch = useAppDispatch();

  // const openCate = Boolean(anchorEl);
  // const id = openCate ? "simple-popover" : undefined;

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

  let words = description.split(" ");
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
  const CreateTitle = () => {
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
        rating: [7],
        tap: "",
      };
      dispatch(postTitle(Title));
      navigate("/");
    }
  };
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  return (
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
            Манга будет отклонятся по следующим причинам: - Если тайтл относится
            к не подходящим для сайта жанрам: хентай, бара, сётакон; - Если это
            додзинси/синглы, которые имеют жанр: яой / юри / эротика (то есть
            тайтл хентай жанров);
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
                  {title.length > 60 ? (
                    <>
                      {" "}
                      <Alert severity="warning">(максимум 60 символов)</Alert>
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
                  {subTitle.length > 60 ? (
                    <>
                      {" "}
                      <Alert severity="warning">(максимум 60 символов)</Alert>
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
                    <img src={img} alt="fail" width="224px" height="350px" />
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
              {/* <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                Категория:{category}
              </Button>
              <Popover
                id={id}
                open={openCate}
                anchorEl={anchorEl}
                onClose={handleCloseCate}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  onClick={() => {
                    setCategory("Comics");
                    handleCloseCate();
                  }}
                  sx={{ p: 2 }}
                  className="CursorEffect"
                >
                  Comics
                </Typography>
                <Typography
                  className="CursorEffect"
                  onClick={() => {
                    setCategory("Manga");

                    handleCloseCate();
                  }}
                  sx={{ p: 2 }}
                >
                  Manga
                </Typography>
                <Typography
                  className="CursorEffect"
                  onClick={() => {
                    setCategory("Manhwa");

                    handleCloseCate();
                  }}
                  sx={{ p: 2 }}
                >
                  Manhwa
                </Typography>
                <Typography
                  className="CursorEffect"
                  onClick={() => {
                    setCategory("manhua");

                    handleCloseCate();
                  }}
                  sx={{ p: 2 }}
                >
                  manhua
                </Typography>
              </Popover> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
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
            <Button onClick={() => CreateTitle()} variant="contained">
              Добавить тайтл
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default CreateTitle;
