import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../hooks/useDebounce";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { sendPassword } from "../../store/authReducer";
import axios from "axios";

const RecoveryPassPage = () => {
  type User = {
    first_name: string;
    img: string;
    email: string;
    password: string;
    aboutMe: string;
    notification: [];
    bookmarksTitle: string[];
    level?: string;
    friends: [];
    comments: [];
    otaku?: boolean;
  };
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [verfied, setVerifed] = useState(false);

  function onChange(value: any) {
    console.log("Captcha value:", value);
    setVerifed(true);
    setOpen(true);
  }

  return (
    <div className="ForgetPasswordPage">
      <h2>{t("Forgot your password?")}</h2>
      <div className="ForgetPasswordContainer">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="TextFieldMui"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Collapse in={open}>
          <Alert
            // action={
            //   <IconButton
            //     aria-label="close"
            //     color="inherit"
            //     size="small"
            //     // onClick={() => {
            //     //   setOpen(false);
            //     // }}
            //   >
            //     <CloseIcon fontSize="inherit" />
            //   </IconButton>
            // }
            sx={{ mb: 2 }}
          >
            {t("letter")}
          </Alert>
          <TextField
            id="outlined-basic"
            label="Заменить пароль"
            variant="outlined"
            className="TextFieldMui"
            value={password}
            onChange={(e) => setPasswod(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!verfied}
            variant="contained"
            size="medium"
            onClick={() => {
              dispatch(sendPassword({ password, email }));
            }}
          >
            Заменить пароль
          </Button>
        </Collapse>

        {/* <h4>
          {t("or")}
          <a href="/login"> {t("sign in")} </a>
        </h4> */}
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default RecoveryPassPage;
