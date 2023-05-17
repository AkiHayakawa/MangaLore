import React, { useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks/useDebounce";
import { getUser } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";

const ProfileNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  type NotificationType = {
    img?: string;
    title?: string;
    sub_title?: string;
    sender: string;
    date: string;
    alert: string;
    tap: string;
  };
  type tap = {
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
    bookmarksTitle: tap;
    level?: string;
    friends: NotificationType[];
    comments: NotificationType[];
    otaku?: boolean;
    id?: number;
  };

  const user: User = useSelector((state: RootState) => state.auth.user);

  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      {user.otaku ? (
        <div className="ProfileNavbar">
          <div className="ProfileNavbarContainer">
            <div className="ProfileNavbarImg">
              <img
                src={
                  !user.img
                    ? "https://64.media.tumblr.com/39bb2fa785ac13040df6de6f441b8056/c56f154af6673db3-77/s1280x1920/2e2c66494c5d67b26744a2c926277b093cdea292.png"
                    : user.img
                }
                alt=""
                width="70px"
                height="70px"
                style={{ borderRadius: "6px" }}
              />
            </div>
            <div className="ProfileNavbarInfo">
              <h3>{user.first_name}</h3>
              <p> Уровень 5 • Ранг # Не определен</p>
            </div>

            <div
              className="ProfileNavbarSettings"
              onClick={() => {
                navigate("/settingsProfile");
              }}
            >
              <SettingsIcon />
              Настройки
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              //   color="primary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Item One" />
              <Tab value="two" label="Item Two" />
              <Tab value="three" label="Item Three" />
            </Tabs>
          </Box>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProfileNavbar;
