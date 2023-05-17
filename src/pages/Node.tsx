import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useDebounce";
import { loginUser, registerUser } from "../store/authReducer";
import axios from "axios";
// import image from ".../";
const Node = () => {
  //? #1 start
  // const strs = ["aacc", "aa", "aa", "aa", "aaca"];
  // let prefix = "";
  // let num = Math.min.apply(
  //   null,
  //   strs.map((item) => item.length)
  // );
  // for (let id = 0; id < strs.length; id++) {
  //   for (let i = 0; i < strs[id].length; i++) {
  //     if (strs.length < 2) {
  //       prefix = strs[0];
  //     } else if (id !== 0) {
  //       if (strs[0][0] !== strs[id][0]) {
  //         prefix = "";
  //         return false;
  //       } else if (strs[0][i] == strs[id][i]) {
  //         prefix = strs[id].slice(0, i + 1);
  //       } else {
  //         if (num > i) {
  //           num = i;
  //         }
  //         break;
  //       }
  //     }
  //   }
  // }
  // if (num - 1 < prefix.length) {
  //   prefix = prefix.slice(0, num);
  // }
  // console.log(prefix);

  // return prefix;
  //? #1 end
  // ?#2 and #3 start
  // let nums = [1, 1, 5, 2, 2, 3];
  // var removeDuplicates = function (nums: number[]) {
  //   let num = 0;
  //   for (let i = 0; i < nums.length; i++) {
  //     if (i < nums.length - 1 && nums[i] == nums[i + 2]) {
  //       continue;
  //     }
  //     nums[num] = nums[i];
  //     num++;
  //   }
  //   return num;
  // };
  // removeDuplicates(nums);
  // console.log(nums);
  // ? #2 #3 end
  // ? #4 start

  // const s = "A man, a plan, a canal: Panama";

  // let result = s
  //   .replace(/[^a-zA-Z0-9]/g, "")
  //   .split("")
  //   .reverse()
  //   .join("")
  //   .toLowerCase();
  // let st = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  // if (result == st) {
  //   console.log("yes");
  // }
  // ? #5 start
  // let nums = [0, 0, 1];
  // var moveZeroes = function (nums: number[]) {
  //   for (let i = nums.length; i--; ) {
  //     if (nums[i] == 0) {
  //       nums.splice(i, 1);
  //       nums.push(0);
  //     }
  //   }

  //   return;
  // };
  // moveZeroes(nums);
  // console.log(nums);
  // ? #5 end
  // ? #6 start
  // Input: s = "leetcode"
  // Output: 0
  // Input: s = "loveleetcode"
  // Output: 2
  // Input: s = "aabb"
  // Output: -1
  // let s = "dddccdbba";
  // let result = 0;
  // let num = 0;
  // const firstUniqChar = (s: string) => {
  //   let arr = {};

  //   for(let i = 0; i < s.length; i++){
  //       if(s[i] in arr){
  //         arr[s[i]] += 1
  //       }
  //       else {
  //         arr[s[i]] =1
  //       }
  //   }
  //   for(let i = 0; i < s.length; i++){
  //       let char = s[i];
  //       if(arr[char] === 1){
  //           return i;
  //       }
  //   }
  //   return -1
  // };
  // firstUniqChar(s);
  // ? 7
  // let word = "Flag";
  // var detectCapitalUse = function (word: string) {
  //   if (word.length == 0) return false;
  //   let cnt = 0;
  //   let first = false;
  //   for (let i = 0; i < word.length; ++i) {
  //     if (word[i] >= "A" && word[i] <= "Z") {
  //       cnt++;
  //       if (i == 0) first = true;
  //     }
  //   }
  //   return cnt === 0 || (cnt === 1 && first) || cnt === word.length;
  // };
  // console.log(detectCapitalUse(word));
  // ? custom
  // const dispatch = useAppDispatch();

  // const login = () => {
  //   let user = {
  //     email: "gouter5@gmail.com",
  //     password: "5",
  //   };
  //   dispatch(loginUser(user));
  // };

  // function registr() {
  //   let userForm = {
  //     first_name: " user.first_name",
  //     last_name: "user.last_name",
  //     img: "user.img",
  //     email: "gouter11217@gmail.com",
  //     password: "11127",
  //     password2: "12117",
  //     aboutMe: "user.aboutMe",
  //     notification: [],
  //     bookmarksTitle: ["read", "abandoned", "intheplans", "favorite", "readed"],
  //     level: "user.level",
  //     friends: [],
  //     comments: [],
  //     otaku: true,
  //   };
  //   dispatch(registerUser(userForm));
  // }
  // let inputFile = document.getElementById("inputFile");

  return (
    <div className="backgroundWhite">
      {/* <input
        type="file"
        name=""
        id="inputFile"
        style={{ display: "none" }}
        onChange={(event) => {
          console.log(event.target.files);
        }}
        multiple
      />
      <div
        style={{
          borderRadius: "4px",
          backgroundColor: "mediumorchid",
          width: "100px",
          height: "40px",
          textAlign: "center",
          margin: "20px",
        }}
        onClick={() => inputFile?.click()}
      >
        Open
      </div> */}
    </div>
  );
};

export default Node;
