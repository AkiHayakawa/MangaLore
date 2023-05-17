// import React, { useState } from "react";

// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useTranslation } from "react-i18next";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
// const RegistrMentor = () => {
//   const [email, setEmail] = useState("");

//   const [first_name, setFirst_name] = useState("");
//   const [last_name, setLast_name] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");

//   const CreateUser = () => {
//     if (!first_name || !last_name || !email || !password || !password2) {
//       alert("Строки должны быть заполнены");
//     } else {
//       let Auth = {
//         email: email,
//         first_name: first_name,
//         last_name: last_name,
//         password: password,
//         password2: password2,
//       };
//       localStorage.setItem("AuthMentor", JSON.stringify(Auth));
//       navigate("/registrMentorStage");

//       setFirst_name("");
//       setLast_name("");
//       setEmail("");
//       setPassword("");
//       setPassword2("");
//     }
//   };
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   return (
//     <div className="RegistrPage">
//       <h2>{t("Become a mentor")}</h2>
//       <div className="RegisterBlock">
//         <Box
//           component="form"
//           sx={{
//             "& > :not(style)": { m: 1, width: "25ch" },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {t("Become a teacher on Udemy")}
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             {t("Discover")}
//           </Typography>
//           <TextField
//             id="outlined-basic"
//             label={t("first_name")}
//             variant="outlined"
//             value={first_name}
//             onChange={(e) => setFirst_name(e.target.value)}
//           />
//           <TextField
//             id="outlined-basic"
//             label={t("last_name")}
//             variant="outlined"
//             value={last_name}
//             onChange={(e) => setLast_name(e.target.value)}
//           />
//           <TextField
//             id="outlined-basic"
//             label={t("email")}
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             id="outlined-basic"
//             label={t("password")}
//             variant="outlined"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <TextField
//             id="outlined-basic"
//             label={t("password2")}
//             variant="outlined"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             size="medium"
//             onClick={() => CreateUser()}
//           >
//             {t("Registr")}
//           </Button>

//           <h4>
//             {t("Already have an account?")}

//             <a href="/login">{t("Login")} </a>
//           </h4>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default RegistrMentor;
import React from "react";

const RegistrMentor = () => {
  return <div>RegistrMentor</div>;
};

export default RegistrMentor;
