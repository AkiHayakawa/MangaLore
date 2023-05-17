import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { SelectFilter, getTitles } from "../../store/crudReducer";
import { useAppDispatch } from "../../hooks/useDebounce";
// mui

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);
  useEffect(() => {
    dispatch(getTitles());
  }, [searchParams]);
  // filter
  const genres: string[] = [
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
  const [genreState, setgenresState] = useState<string[]>([]);
  const joinGenre = (ganre: string) => {
    if (!genreState.includes(ganre)) {
      setgenresState((oldArray) => [...oldArray, ganre]);
    } else {
      let myIndex = genreState.indexOf(ganre);

      if (myIndex !== -1) {
        genreState.splice(myIndex, 1);
      }
    }
    console.log(genreState);
  };

  let selectGenres: string[] = [];
  let selectDate: string[] = ["0", "2023"];
  let selectRating: string[] = ["0", "10"];
  const [dateStart, setDateStart] = useState<string>("1930");
  const [dateEnd, setDateEnd] = useState<string>("2024");

  const [ratingStart, setRatingStart] = useState<string>("0");
  const [ratingEnd, setRatingEnd] = useState<string>("10");
  // жанры, дата релиза,рейтинг,
  let page = 1;
  const ResSelect = () => {
    if (dateStart == "") {
      setDateStart("1930");
    }
    if (dateEnd == "") {
      setDateEnd("2024");
    }
    selectGenres = [...genreState];
    selectDate = [dateStart, dateEnd];
    selectRating = [ratingStart, ratingEnd];
    page = 1;
    dispatch(SelectFilter({ selectGenres, selectDate, selectRating, page }));
    localStorage.setItem("page", JSON.stringify(1));
  };

  return (
    <div className="ProductPage">
      <div className="ProductPageCard">
        <ProductCard />
      </div>
      <div className="SideBarContainer">
        <div className="SideBarBlock">
          <p>DateRelease</p>

          <div className="DateFilterInputBlock">
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="От"
              value={dateStart}
              onChange={(e) => {
                setDateStart(e.target.value);
              }}
            />
            <span>__</span>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="До"
              value={dateEnd}
              onChange={(e) => {
                setDateEnd(e.target.value);
              }}
            />
          </div>
          <p>Rating</p>

          <div className="DateFilterInputBlock">
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="От"
              value={ratingStart}
              onChange={(e) => {
                setRatingStart(e.target.value);
              }}
            />
            <span>__</span>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="До"
              value={ratingEnd}
              onChange={(e) => {
                setRatingEnd(e.target.value);
              }}
            />
          </div>
          <p>Genres</p>
          {genres.map((sub_category: string) => (
            <div>
              {" "}
              <FormControlLabel
                control={<Checkbox />}
                onClick={() => {
                  joinGenre(sub_category);
                }}
                label
              />
              {sub_category}
            </div>
          ))}
        </div>
        <div className="SideBarBlockStickyButton">
          <div
            className="SideBarButton"
            onClick={() => {
              ResSelect();
            }}
          >
            Показать
          </div>
          <div
            className="SideBarButton"
            onClick={() => {
              window.location.reload();
            }}
          >
            {" "}
            Сбросить
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
