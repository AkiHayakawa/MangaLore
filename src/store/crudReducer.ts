import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

type CrudState = {
  list: Title[];
  loading: boolean;
  error: string | null;
  titleDetails: {};
  filter: SelectFilter;
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
  tap: string;
};
type SelectFilter = {
  selectGenres: string[];
  selectDate: string[];
  selectRating: string[];
  page: number;
};
type UpdateType = {
  id: string[];
  key: string;
  update: any;
};
export const postTitle = createAsyncThunk<
  Title,
  Title,
  { rejectValue: string }
>("crud/postTitle", async (Title) => {
  let title = {
    title: Title.title,
    sub_title: Title.sub_title,
    description: Title.description,
    category: Title.category,
    genres: Title.genres,
    img: Title.img,
    backroundImg: Title.backroundImg,
    author: Title.author,
    artist: Title.artist,
    publisher: Title.publisher,
    dateRelease: Title.dateRelease,
    rating: Title.rating,
    tap: Title.tap,
  };

  const { data } = await axios.post(
    `http://localhost:8000/posts`,
    title,
    config
  );
  return data;
});
export const getTitles = createAsyncThunk<
  Title[],
  undefined,
  { rejectValue: string }
>("crud/getTitles", async (_) => {
  const { data } = await axios(
    `http://localhost:8000/posts/${window.location.search}`
  );
  return data;
});
export const editTitle = createAsyncThunk<
  Title,
  Title,
  { rejectValue: string }
>("crud/editTitle", async (Title) => {
  let title = {
    title: Title.title,
    sub_title: Title.sub_title,
    description: Title.description,
    category: Title.category,
    genres: Title.genres,
    img: Title.img,
    backroundImg: Title.backroundImg,
    author: Title.author,
    artist: Title.artist,
    publisher: Title.publisher,
    dateRelease: Title.dateRelease,
    chapters: Title.chapters,
    rating: Title.rating,
    tap: Title.tap,
  };

  const { data } = await axios.put(
    `http://localhost:8000/posts/${Title.id}`,
    title,
    config
  );
  return data;
});
export const getProductDetails = createAsyncThunk<
  {},
  string | undefined,
  { rejectValue: string }
>("crud/getProductDetails", async (id) => {
  const { data } = await axios.get(`http://localhost:8000/posts/${id}`);
  return data;
});

export const deleteTitle = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("crud/deleteTitle", async (id) => {
  return await axios.delete(`http://localhost:8000/posts/${id}`);
});
export const SelectFilter = createAsyncThunk<
  SelectFilter,
  SelectFilter,
  { rejectValue: string }
>("crud/SelectFilter", async (obj) => {
  return obj;
});
export const UpdateOneElement = createAsyncThunk<
  UpdateType,
  any,
  { rejectValue: string }
>("crud/UpdateOneElement", async (obj: UpdateType) => {
  const { data } = await axios.get(`http://localhost:8000/posts/${obj.id}`);
  return await axios.patch(`http://localhost:8000/posts/${obj.id}`, {
    ...data,
    rating: obj.update,
  });
});
// export const addTap = createAsyncThunk<any, any, { rejectValue: string }>(
//   "crud/addTap",
//   async (obj) => {
//     const { data } = await axios.get(`http://localhost:8000/posts/${obj.id}`);
//     return await axios.patch(`http://localhost:8000/posts/${obj.id}`, {
//       ...data,
//       tap: obj.tap,
//     });
//   }
// );
const initialState: CrudState = {
  list: [],
  loading: false,
  error: null,
  titleDetails: {},
  filter: {
    selectGenres: [],
    selectDate: ["1930", "2023"],
    selectRating: ["0", "10"],
    page: 1,
  },
};
const crudReducer = createSlice({
  name: "crud",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTitles.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.titleDetails = action.payload;
      })
      .addCase(SelectFilter.fulfilled, (state, action) => {
        state.filter = action.payload;
      });
  },
});

export default crudReducer.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
