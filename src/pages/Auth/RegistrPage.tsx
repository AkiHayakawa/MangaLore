import React, { useState } from "react";

import { registerUser } from "../../store/authReducer";
import { useAppDispatch } from "../../hooks/useDebounce";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [first_name, setFirst_name] = useState("");
  const [img, setImg] = useState(
    "https://64.media.tumblr.com/39bb2fa785ac13040df6de6f441b8056/c56f154af6673db3-77/s1280x1920/2e2c66494c5d67b26744a2c926277b093cdea292.png"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [notification, setNotification] = useState([]);
  const [bookmarksTitle, setBookmarksTitle] = useState([]);
  const [level, setlevel] = useState("");
  const [friends, setfriends] = useState([]);
  const [comments, setComments] = useState([]);
  const [otaku, setOtaku] = useState(true);

  const CreateUser = () => {
    if (!first_name || !email || !password) {
      alert("Строки должны бытб заполнены");
    } else {
      let Auth = {
        first_name: first_name,
        img: img,
        email: email,
        password: password,
        aboutMe: aboutMe,
        notification: notification,
        bookmarksTitle: bookmarksTitle,
        level: level,
        friends: friends,
        comments: comments,
        otaku: otaku,
      };

      dispatch(registerUser(Auth));
      navigate("/login");
    }
  };
  const { t } = useTranslation();

  return (
    <div className="RegistrPage">
      <h3>{t("Register and start learning")}</h3>

      <div className="RegisterBlock">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label={t("NickName")}
            variant="outlined"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label={t("email")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label={t("password")}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <p>
          <input type="checkbox" name="" id="" />
          {t("Send me special offers")}
        </p>
        <Button variant="contained" size="medium" onClick={() => CreateUser()}>
          {t("Registr")}
        </Button>

        <h4>
          {t("Already have an account?")}
          <a href="/login"> {t("Login")}</a>
        </h4>
      </div>
    </div>
  );
};

export default AuthPage;
