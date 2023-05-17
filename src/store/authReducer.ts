import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const Api = "http://localhost:8000/users";
type AuthState = {
  user: User;
};
type NotificationType = {
  img?: string;
  title?: string;
  sub_title?: string;
  sender: string;
  date: string;
  alert: string;
  tap: string;
};
type Tap = {
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
  bookmarksTitle: Tap;
  level?: string;
  friends: NotificationType[];
  comments: NotificationType[];
  otaku?: boolean;
  id?: number;
};

type PassEmail = {
  email: string;
  password: string;
};
type tapsId = {
  tap: string;
  id: string;
};
export const registerUser = createAsyncThunk<any, any, { rejectValue: string }>(
  "auth/registerUser",
  async (user) => {
    const { data } = await axios(Api);
    function checkPassword(users: User) {
      return users.email == user.email || users.password == user.password;
    }
    if (!data.find(checkPassword)) {
      let userForm = {
        first_name: user.first_name,
        img: user.img,
        email: user.email,
        password: user.password,
        aboutMe: user.aboutMe,
        notification: user.notification,
        bookmarksTitle: user.bookmarksTitle,
        level: user.level,
        friends: user.friends,
        comments: user.comments,
        otaku: user.otaku,
      };

      return await axios.post(Api, userForm);
    } else {
      alert("email and password already ");
    }
  }
);
export const loginUser = createAsyncThunk<User, any, { rejectValue: string }>(
  "auth/loginUser",
  async (user) => {
    const { data } = await axios(Api);
    function checkPassword(users: User) {
      return users.password == user.password && users.email == user.email;
    }
    if (data.find(checkPassword) == undefined) {
      alert("sorry");
    } else {
      localStorage.setItem("userId", data.find(checkPassword).id);
      return data.find(checkPassword);
    }
  }
);
// export const getUserId = createAsyncThunk<
//   User,
//   undefined,
//   { rejectValue: string }
// >("auth/getUserId", async (_) => {
//   const user: User = JSON.parse(localStorage.getItem("user") || "{}");
//   const { data } = await axios(`http://localhost:8000/users/${user.id}`);
//   return data;
// });

export const getUser = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>("auth/getUser", async (_) => {
  const userID = localStorage.getItem("userId");
  const { data } = await axios(`${Api}/${userID}`);
  if (!data) {
    return alert("sorry");
  }
  return data;
});
export const sendPassword = createAsyncThunk<
  any,
  PassEmail,
  { rejectValue: string }
>("auth/sendPassword", async (obj) => {
  const { data } = await axios(Api);
  function checkPassword(users: User) {
    return users.email == obj.email;
  }
  if (data.find(checkPassword).password !== undefined) {
    return await axios.patch(
      `http://localhost:8000/users/${data.find(checkPassword).id}`,
      {
        password: obj.password,
      }
    );
  } else {
    return alert("sorry");
  }
});
export const addTap = createAsyncThunk<any, tapsId, { rejectValue: string }>(
  "auth/addTap",
  async ({ tap, id }) => {
    const userID = localStorage.getItem("userId");
    const { data } = await axios.patch(`${Api}/${userID}`);
    let dat: User = data;
    let book = dat.bookmarksTitle[tap].filter((item: string) => item != id);
    book.push(id);
    for (let key in dat.bookmarksTitle) {
      dat.bookmarksTitle[key] = dat.bookmarksTitle[key].filter(
        (item: string) => item != id
      );
    }
    return await axios.patch(`${Api}/${userID}`, {
      ...dat,
      bookmarksTitle: { ...dat.bookmarksTitle, [tap]: book },
    });
  }
);
const initialState: AuthState = {
  user: {
    first_name: "string;",
    img: "string;",
    email: "string;",
    password: "string;",
    aboutMe: "string;",
    notification: [],
    bookmarksTitle: {
      read: [],
      abandoned: [],
      intheplans: [],
      favorite: [],
      readed: [],
    },
    level: "string;",
    friends: [],
    comments: [],
    otaku: false,
    id: 0,
  },
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
});

export default AuthReducer.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
