import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useDebounce";
import { SelectFilter, getTitles } from "../../store/crudReducer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ProductCard() {
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
    id: string;
  };
  type CrudState = {
    list: Title[];
    loading: boolean;
    error: string | null;
    filter: {
      selectGenres: string[];
      selectDate: string[];
      selectRating: string[];
      page: number;
    };
  };
  interface RootState {
    crud: CrudState;
  }
  let list = useSelector((state: RootState) => state.crud.list);
  const filter = useSelector((state: RootState) => state.crud.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTitles());
  }, []);
  const [genreId, setGenreId] = useState<string[]>([]);
  useEffect(() => {
    setGenreId([]);
    if (filter.selectGenres) {
      list.map((title) => {
        let filterGenres: string[] = [];
        title.genres.map((genre) => {
          for (let i = 0; i < filter.selectGenres.length; i++) {
            if (genre == filter.selectGenres[i]) {
              filterGenres.push(genre);
            }
          }
          if (filterGenres.length == filter.selectGenres?.length) {
            setGenreId((oldArray) => [...oldArray, title.id]);
          }
        });
      });
    }
  }, [filter.selectGenres]);

  // pagination

  // let DateStart = Number(filter.selectDate[0]);
  // let DateEnd = Number(filter.selectDate[1]);
  // let yesId = genreId;
  const itemsOnPage = 10;
  let count = Math.ceil(list.length / itemsOnPage);
  const [page, setPage] = React.useState(
    JSON.parse(localStorage.getItem("page") || "")
  );
  let finishList: Title[] = [];

  useEffect(() => {
    currentData();
    // console.log(finishList.length);
    // count = Math.ceil(finishList.length / itemsOnPage);
  }, []);

  function currentData() {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    list.map((title) => {
      let numDate = Number(title.dateRelease);
      if (
        (Number(filter.selectDate[0]) <= numDate &&
          numDate <= Number(filter.selectDate[1]) &&
          genreId.includes(title.id)) ||
        genreId.length == 0
      ) {
        finishList.push(title);
      }
    });
    // setPage(1);
    count = Math.ceil(finishList.length / itemsOnPage);
    return finishList.slice(begin, end);
  }
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    localStorage.setItem("page", JSON.stringify(value));
  };
  useEffect(() => {
    setPage(JSON.parse(localStorage.getItem("page") || ""));
  }, [JSON.parse(localStorage.getItem("page") || "")]);
  return (
    <div>
      {" "}
      {list ? (
        <div className="ProductCardContainer">
          {currentData().map((title) => {
            return (
              <Paper elevation={3} className="CardPaper">
                <img
                  src={title.img}
                  alt=""
                  width="195px"
                  height="250px"
                  style={{ borderRadius: "4px" }}
                  onClick={() => navigate(`/product/details/${title.id}`)}
                />
                <div className="MiniDescriptionCard">
                  <Tooltip
                    placement="right"
                    title={
                      <div className="TooltipLabelBlock">
                        <h2 className="obvod">{title.title}</h2>
                        <h3 className="obvod colorGray">{title.sub_title}</h3>
                        <h2 className="obvod dffdr">
                          Дата релиза:{" "}
                          <div className="obvod colorGrayBlue">
                            {title.dateRelease}
                          </div>
                        </h2>
                        <h3 className="obvod">
                          {title.description.slice(0, 260)}...
                        </h3>
                      </div>
                    }
                  >
                    <div>
                      {" "}
                      <h5>{title.category}</h5>
                      <h3>{title.title}</h3>
                    </div>
                  </Tooltip>
                </div>
              </Paper>
            );
          })}
          <div className="PaginationBlock">
            <Stack spacing={2}>
              <Pagination
                variant="outlined"
                color="primary"
                count={count}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <div></div>
    </div>
  );
}
{
  /* <div className="ProductCardContainer">
            {list.map((title) => (
              <Paper elevation={3} className="CardPaper">
                <img
                  src={title.img}
                  alt=""
                  width="200px"
                  height="260px"
                  onClick={() => navigate(`/product/details/${title.id}`)}
                />
                <div className="MiniDescriptionCard">
                  <h4>{title.title}</h4>
                  <Tooltip title={<h2>{title.description}</h2>}>
                    <AssignmentLateIcon />
                  </Tooltip>
                </div>
              </Paper>
            ))}
          </div> */
}
// import React, { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
// import Tooltip from "@mui/material/Tooltip";
// import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../../hooks/useDebounce";
// import { getTitles } from "../../store/crudReducer";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import { useNavigate } from "react-router-dom";

// export default function ProductCard() {
//   type Title = {
//     title: string;
//     sub_title: string;
//     description: string;
//     category: string;
//     genres: string[];
//     img: string;
//     backroundImg: string;
//     author: string;
//     artist: string;
//     publisher: string;
//     dateRelease: string;
//     id: string;
//   };
//   type CrudState = {
//     list: Title[];
//     loading: boolean;
//     error: string | null;
//     filter: {
//       selectGenres: string[];
//       selectDate: string[];
//       selectRating: string[];
//     };
//   };
//   interface RootState {
//     crud: CrudState;
//   }
//   const list = useSelector((state: RootState) => state.crud.list);
//   const filter = useSelector((state: RootState) => state.crud.filter);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     dispatch(getTitles());
//   }, []);
//   console.log(filter.selectGenres, "genre");
//   const [genreId, setGenreId] = useState<string[]>([]);
//   useEffect(() => {
//     setGenreId([]);
//     if (filter.selectGenres) {
//       list.map((title) => {
//         let filterGenres: string[] = [];
//         title.genres.map((genre) => {
//           for (let i = 0; i < filter.selectGenres.length; i++) {
//             if (genre == filter.selectGenres[i]) {
//               filterGenres.push(genre);
//             }
//           }
//           if (filterGenres.length == filter.selectGenres?.length) {
//             setGenreId((oldArray) => [...oldArray, title.id]);
//           }
//         });
//       });
//     }
//   }, [filter.selectGenres]);
//   let DateStart = Number(filter.selectDate[0]);
//   let DateEnd = Number(filter.selectDate[1]);
//   let yesId = genreId;

//   console.log(yesId, "last");

//   return (
//     <div>
//       {" "}
//       {list ? (
//         <div className="ProductCardContainer">
//           {list.map((title) => {
//             let numDate = Number(title.dateRelease);
//             if (
//               (DateStart <= numDate &&
//                 numDate <= DateEnd &&
//                 yesId.includes(title.id)) ||
//               yesId.length == 0
//             ) {
//               return (
//                 <Paper elevation={3} className="CardPaper">
//                   <img
//                     src={title.img}
//                     alt=""
//                     width="220px"
//                     height="240px"
//                     onClick={() => navigate(`/product/details/${title.id}`)}
//                   />
//                   <div className="MiniDescriptionCard">
//                     <h4>{title.title}</h4>
//                     <Tooltip title={<h2>{title.description}</h2>}>
//                       <AssignmentLateIcon />
//                     </Tooltip>
//                   </div>
//                 </Paper>
//               );
//             }
//           })}
//         </div>
//       ) : (
//         <Box sx={{ display: "flex" }}>
//           <CircularProgress />
//         </Box>
//       )}
//     </div>
//   );
// }
// {
/* <div className="ProductCardContainer">
            {list.map((title) => (
              <Paper elevation={3} className="CardPaper">
                <img
                  src={title.img}
                  alt=""
                  width="200px"
                  height="260px"
                  onClick={() => navigate(`/product/details/${title.id}`)}
                />
                <div className="MiniDescriptionCard">
                  <h4>{title.title}</h4>
                  <Tooltip title={<h2>{title.description}</h2>}>
                    <AssignmentLateIcon />
                  </Tooltip>
                </div>
              </Paper>
            ))}
          </div> */
// }
// "chapters": [
//   {
//     "tom": "1",
//     "chapter": {
//       "number": "1",
//       "pages": [
//         "0",
//         "1",
//         "2",
//         "3",
//         "4",
//         "5",
//         "6",
//         "7",
//         "8",
//         "9",
//         "10",
//         "11",
//         "12",
//         "13",
//         "14",
//         "15",
//         "16",
//         "17",
//         "18",
//         "19",
//         "20",
//         "21",
//         "22",
//         "23",
//         "24",
//         "25",
//         "26",
//         "27",
//         "28",
//         "29",
//         "30",
//         "31",
//         "32",
//         "33",
//         "34",
//         "35",
//         "36"
//       ]
//     }
//   },
//   {
//     "tom": "1",
//     "chapter": {
//       "number": "2",
//       "pages": [
//         "0",
//         "1",
//         "2",
//         "3",
//         "4",
//         "5",
//         "6",
//         "7",
//         "8",
//         "9",
//         "10",
//         "11",
//         "12",
//         "13",
//         "14",
//         "15",
//         "16",
//         "17",
//         "18",
//         "19",
//         "20",
//         "21",
//         "22",
//         "23",
//         "24",
//         "25",
//         "26",
//         "27",
//         "28",
//         "29",
//         "30",
//         "31",
//         "32",
//         "33",
//         "34",
//         "35",
//         "36",
//         "37",
//         "38",
//         "39",
//         "40",
//         "41",
//         "42",
//         "43",
//         "44",
//         "45",
//         "46"
//       ]
//     }
//   }
// ],
