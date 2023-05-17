import React, { useEffect, useState } from "react";
// mui start
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// mui eng
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductDetails } from "../store/crudReducer";
import { useAppDispatch } from "../hooks/useDebounce";

const ReadTitle = () => {
  const { id } = useParams();
  const { tom } = useParams();
  const { number } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(tom, number);
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

    id: string;
  };
  type CrudState = {
    titleDetails: Title;
  };
  interface RootState {
    crud: CrudState;
  }
  const title = useSelector((state: RootState) => state.crud.titleDetails);
  // console.log(Number(number) - 1);
  const [chapterNum, setChapterNum] = useState(Number(number) - 1);
  let titlee = [
    {
      tom: "1",

      chapter: {
        number: "1",
        pages: [
          "https://i.pinimg.com/originals/21/69/c5/2169c551ea9fa777ab4cd17e4da0e69d.gif",
        ],
      },
    },

    {
      tom: "2",

      chapter: {
        number: "2",
        pages: [
          "https://i.pinimg.com/originals/21/69/c5/2169c551ea9fa777ab4cd17e4da0e69d.gif",
        ],
      },
    },
  ];
  if (title.chapters) {
    titlee = title.chapters;
  }

  const maxSteps = titlee[chapterNum].chapter.pages.length;
  const maxChapters = titlee.length;
  // const selectionChapter = (num: number) => {
  //   localStorage.setItem(
  //     "chapternum",
  //     JSON.stringify({
  //       chapter: num,
  //     })
  //   );
  //   console.log(num, "num");
  // };
  // useEffect(() => {
  //   if (localStorage.getItem("chapternum")) {
  //     let token = JSON.parse(localStorage.getItem("chapternum") || "");
  //     token ? setChapterNum(token.chapter) : setChapterNum(0);
  //   }
  // }, []);
  // selectionChapter(Number(number) - 1);

  const [activeStep, setActiveStep] = useState(0);
  const spy: HTMLElement | null = document.getElementById("keyboardSpy");
  if (spy !== null) {
    spy.addEventListener("keydown", function (event: any) {
      alert("Нажата клавиша " + event.key);
    });
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const rows = [];
  for (let i = 1; i < maxSteps + 1; i++) {
    rows.push(i);
  }
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [startImgBlock, setStartImgBlock] = useState(0);
  const [imgBlockWidth, setImgBlockWidth] = useState(0);
  useEffect(() => {
    let obj: any = document.getElementsByClassName("CarouselBlockImg");
    setImgBlockWidth(obj[0].offsetWidth);
    let start = obj[0].getBoundingClientRect().left;
    setStartImgBlock(start);
  }, []);
  let prevScrollpos = window.pageYOffset;
  let navbar: any = document.getElementById("ReadTitleNavbar");
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos && window.pageYOffset > 69 && navbar) {
      navbar.classList.add("ReadTitleNavbarFixed");
      navbar.classList.remove("ReadTitleNavbarAbsolute");
    } else {
      navbar.classList.remove("ReadTitleNavbarFixed");
      navbar.classList.add("ReadTitleNavbarAbsolute");
    }
    prevScrollpos = currentScrollPos;
  };
  return (
    <>
      {title ? (
        <Box sx={{ maxWidth: 1600, flexGrow: 1 }} id="keyboardSpy">
          <Paper
            id="ReadTitleNavbar"
            className="ReadTitleNavbarAbsolute ReadTitleNavbar"
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <div
              className="ReadTitleNavbarTitleBlock CursorEffect"
              onClick={() => {
                navigate(`/product/details/${id}`);
              }}
            >
              {" "}
              <img
                src="https://cdn2.iconfinder.com/data/icons/ui-rpg-game/256/spellbook_spell_book_journal_folder_info_game_ui_fantasy_rpg_icon_button-512.png"
                alt=""
                width={46}
              />
              <Typography>
                <h5>
                  <h5>{title.title}</h5>
                  {title.sub_title}
                </h5>
              </Typography>{" "}
            </div>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Page:{activeStep + 1}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                variant="standard"
                label="page"
                onChange={handleChange}
                className="ReadTitleSelectChapterNum"
              >
                <div>
                  {rows.map((item) => (
                    <MenuItem
                      onClick={() => {
                        setActiveStep(item - 1);
                      }}
                      value={item}
                    >
                      Page/{item}
                    </MenuItem>
                  ))}
                </div>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Оглавление: {chapterNum + 1}
              </InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="page"
                onChange={handleChange}
                className="ReadTitleSelectChapterNum"
              >
                <div>
                  {titlee.map((item, index) => (
                    <MenuItem
                      onClick={() => {
                        setChapterNum(index);
                        setActiveStep(0);
                        navigate(`/product/read/${id}/${tom}/${index + 1}`);
                        // console.log(index, "chapter");
                      }}
                      value={index}
                    >
                      Chapter/{index + 1}
                    </MenuItem>
                  ))}
                </div>
              </Select>
            </FormControl>
          </Paper>

          <div className="CarouselBlockBox">
            <Box
              sx={{
                height: 755,
                // maxWidth: 600,
                width: "100%",
                p: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                className="CarouselBlockImg CursorEffect"
                src={`/images/${title.sub_title}/${title.sub_title} Том ${tom} Глава ${titlee[chapterNum].chapter.number} [mangalib.me]/${titlee[chapterNum].chapter.pages[activeStep]}.jpeg`}
                alt=""
                // width={600}
                height="97%"
                onClick={(event) =>
                  event.clientX - startImgBlock > imgBlockWidth / 2
                    ? activeStep == maxSteps - 1
                      ? null
                      : handleNext()
                    : activeStep == 0
                    ? null
                    : handleBack()
                }
              />
              {title.chapters ? null : (
                <h1 className="textWhite ReadLoading">Loading...</h1>
              )}
            </Box>
          </div>
          <MobileStepper
            className="MobileStepper"
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <>
                {activeStep === maxSteps - 1 ? (
                  chapterNum == maxChapters - 1 ? (
                    <div className="CursorEffect">Главы Закончились</div>
                  ) : (
                    <div
                      className="CursorEffect"
                      onClick={() => {
                        // selectionChapter(chapterNum + 1);
                        navigate(
                          `/product/read/${id}/${tom}/${chapterNum + 2}`
                        );
                        window.location.reload();
                      }}
                    >
                      Следующая Глава
                      <KeyboardArrowRight />
                    </div>
                  )
                ) : (
                  <div className="CursorEffect" onClick={handleNext}>
                    Next
                    <KeyboardArrowRight />
                  </div>
                )}
              </>
            }
            backButton={
              <>
                {activeStep === 0 ? (
                  chapterNum == 0 ? (
                    <div className="CursorEffect">первая</div>
                  ) : (
                    <div
                      className="CursorEffect"
                      onClick={() => {
                        // selectionChapter(chapterNum - 1);
                        navigate(`/product/read/${id}/${tom}/${chapterNum}`);

                        window.location.reload();
                      }}
                    >
                      <KeyboardArrowLeft />
                      Предыдущая Глава
                    </div>
                  )
                ) : (
                  <div className="CursorEffect" onClick={handleBack}>
                    <KeyboardArrowLeft />
                    Back
                  </div>
                )}
              </>
            }
          />
        </Box>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};
export default ReadTitle;
