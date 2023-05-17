import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import RecoveryPassPage from "../pages/Auth/RecoveryPassPage";
import RegistrPage from "../pages/Auth/RegistrPage";
// import RegistrMentor from "../pages/AuthMentor/RegistrMentor";
// import RegistrMentorStage from "../pages/AuthMentor/RegistrMentorStage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateTitle from "../components/CRUD/CreateTitle";
import ProductDetails from "../pages/Products/ProductDetails";
import EditTitle from "../components/CRUD/EditTitle";
import ReadTitle from "../pages/ReadTitle";
import Node from "../pages/Node";
import ProfilePage from "../pages/Profile/ProfilePage";
import ProfileShedule from "../pages/Profile/ProfileShedule";
import SettingsProfile from "../pages/Profile/SettingsProfile";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/registr",
      element: <RegistrPage />,
      id: 1,
    },
    {
      link: "/settingsProfile",
      element: <SettingsProfile />,
      id: 2,
    },
    // {
    //   link: "/registrMentorStage",
    //   element: <RegistrMentorStage />,
    //   id: 3,
    // },
    {
      link: "login",
      element: <LoginPage />,
      id: 4,
    },
    {
      link: "/recoveryPass",
      element: <RecoveryPassPage />,
      id: 5,
    },
    // {
    //   link: "/account/login",
    //   element: <CreateNewPass />,
    //   id: 6,
    // },
    {
      link: "/",
      element: <HomePage />,
      id: 7,
    },
    {
      link: "*",
      element: <NotFoundPage />,
      id: 8,
    },
    {
      link: "/createTitle",
      element: <CreateTitle />,
      id: 9,
    },
    {
      link: "/product/details/:id",
      element: <ProductDetails />,
      id: 10,
    },
    {
      link: "/product/edit/:id",
      element: <EditTitle />,
      id: 11,
    },
    {
      link: "/product/read/:id/:tom/:number",
      element: <ReadTitle />,
      id: 12,
    },
    {
      link: "/Node",
      element: <Node />,
      id: 13,
    },
    {
      link: "/profileShedule",
      element: <ProfileShedule />,
      id: 14,
    },
  ];

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
