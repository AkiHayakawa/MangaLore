// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../hooks/useDebounce";

// import { registerMentor } from "../../store/authReducer";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Button from "@mui/material/Button";

// // tabs mui
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import { useTranslation } from "react-i18next";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }
// const RegistrMentorStage = () => {
//   const dispatch = useAppDispatch();

//   const [type, setType] = useState("");
//   const [experience, setExperience] = useState("");
//   const [audience, setAudience] = useState("");

//   const CreateUser = () => {
//     if (!type || !experience || !audience) {
//       alert("Строки должны быть заполнены");
//     } else {
//       let Auth = {
//         type: type,
//         experience: experience,
//         audience: audience,
//       };
//       let Mentor = JSON.parse(localStorage.getItem("AuthMentor") || "{}");
//       let AuthMentor = { ...Auth, ...Mentor };
//       dispatch(registerMentor(AuthMentor));
//       localStorage.removeItem("AuthMentor");
//       console.log(AuthMentor);
//       navigate("/");
//     }
//   };
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   // tabs mui
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };
//   return (
//     <div className="RMentorStage">
//       <div className="RegisterContainer">
//         <h2>{t("Register Mentor")}</h2>
//         <Box sx={{ width: "100%" }}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               aria-label="basic tabs example"
//             >
//               <Tab label={t("Form")} {...a11yProps(0)} />
//               <Tab label={t("Experience")} {...a11yProps(1)} />
//               <Tab label={t("Audience")} {...a11yProps(2)} />
//             </Tabs>
//           </Box>
//           <TabPanel value={value} index={0}>
//             <div className="RMentorStage">
//               <div>
//                 <h2>{t("Share your knowledge")}</h2>
//                 <p>{t("RMentorStageOneP")}</p>
//                 <FormControl>
//                   <FormLabel id="demo-radio-buttons-group-label">
//                     {t("Form")}
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby="demo-radio-buttons-group-label"
//                     name="radio-buttons-group"
//                   >
//                     <FormControlLabel
//                       value="female"
//                       control={<Radio />}
//                       label={t("Personally, privately")}
//                       onClick={() => setType("individual not oficial")}
//                     />
//                     <FormControlLabel
//                       value="male"
//                       control={<Radio />}
//                       label={t("Personally, professionally")}
//                       onClick={() => setType("individual prof")}
//                     />
//                     <FormControlLabel
//                       value="online"
//                       control={<Radio />}
//                       label={t("online")}
//                       onClick={() => setType("online")}
//                     />
//                     <FormControlLabel
//                       value="other"
//                       control={<Radio />}
//                       label={t("other")}
//                       onClick={() => setType("other")}
//                     />
//                   </RadioGroup>
//                 </FormControl>
//               </div>
//               <img
//                 src="https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg"
//                 alt=""
//                 width="50%"
//                 height="100%"
//               />
//             </div>
//           </TabPanel>
//           <TabPanel value={value} index={1}>
//             <div className="RMentorStage">
//               <div>
//                 <h2> {t("Create a course")} </h2>

//                 <p>{t("RMentorStageTwoP")}</p>
//                 <FormControl>
//                   <FormLabel id="demo-radio-buttons-group-label">
//                     {t("Experience")}
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby="demo-radio-buttons-group-label"
//                     name="radio-buttons-group"
//                   >
//                     <FormControlLabel
//                       value="female"
//                       control={<Radio />}
//                       label={t("beginning")}
//                       onClick={() => setExperience("beginning")}
//                     />
//                     <FormControlLabel
//                       value="male"
//                       control={<Radio />}
//                       label={t("medium")}
//                       onClick={() => setExperience("medium")}
//                     />
//                     <FormControlLabel
//                       value="online"
//                       control={<Radio />}
//                       label={t("prof")}
//                       onClick={() => setExperience("prof ")}
//                     />
//                   </RadioGroup>
//                 </FormControl>
//               </div>
//               <img
//                 src="https://s.udemycdn.com/teaching/record-your-video-v3.jpg"
//                 alt=""
//                 width="50%"
//                 height="100%"
//               />
//             </div>
//           </TabPanel>
//           <TabPanel value={value} index={2}>
//             <div className="RMentorStage">
//               <div>
//                 <h2> {t("Create a course")}</h2>
//                 <p>{t("RMentorStageThreeP")}</p>{" "}
//                 <FormControl>
//                   <FormLabel id="demo-radio-buttons-group-label">
//                     {t("Audience")}
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby="demo-radio-buttons-group-label"
//                     name="radio-buttons-group"
//                   >
//                     <FormControlLabel
//                       value="female"
//                       control={<Radio />}
//                       label={t("no")}
//                       onClick={() => setAudience("no")}
//                     />
//                     <FormControlLabel
//                       value="male"
//                       control={<Radio />}
//                       label={t("a few")}
//                       onClick={() => setAudience("a few")}
//                     />
//                     <FormControlLabel
//                       value="online"
//                       control={<Radio />}
//                       label={t("a lot")}
//                       onClick={() => setAudience("a lot")}
//                     />
//                   </RadioGroup>
//                 </FormControl>
//               </div>
//               <img
//                 src="https://s.udemycdn.com/teaching/launch-your-course-v3.jpg"
//                 alt=""
//                 width="50%"
//                 height="100%"
//               />
//             </div>
//           </TabPanel>
//         </Box>
//         <Button
//           variant="contained"
//           size="medium"
//           onClick={() => {
//             CreateUser();
//           }}
//         >
//           {t("Registr")}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RegistrMentorStage;
import React from "react";

const RegistrMentorStage = () => {
  return <div>RegistrMentorStage</div>;
};

export default RegistrMentorStage;
