"use Strict";

import { createSpace } from "./studyboard.js";
import { updateSetting, updatePassword } from "./updatesetting.js";
import { deleteMe } from "./deleteMe.js";
import {
  enrolCourse,
  deleteCourse,
  createCourse,
  editCourse,
  getHired,
} from "./courseAction.js";
import { postQuestions } from "./algoNetActions.js";
import { deleteUser, deleteEnrol, authorizeEnrol } from "./manage.js";

// import { showAlert } from "./alert.js";

// import { createSpaceFunction } from "./studyboard.js";

// togle dark button function
let darkMode = localStorage.getItem("darkMode");
const darkTogle = document.querySelector(".dark");

const enableDark = () => {
  document.body.classList.add("dark");
  console.log("its now dark");
  localStorage.setItem("darkMode", "ok");
};
const disDark = () => {
  document.body.classList.remove("dark");
  console.log("its now light");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "ok") {
  enableDark();
}

darkTogle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "ok") {
    enableDark();
    console.log(darkMode);
  } else {
    disDark();
    console.log(darkMode);
  }
});

//active link function
const activePage = window.location.pathname;
// console.log(activePage.split("/")[1]);
let comp2 = activePage.split("/")[1];

const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  // console.log(link.href.split("/")[3]);
  let comp = link.href.split("/")[3];
  const starts = comp.startsWith(comp2);
  // console.log(starts);
  if (starts) {
    link.classList.add("active");
  }
});

const manageLinks = document.querySelectorAll(".manage-tab ul a");
if (manageLinks) {
  manageLinks.forEach((link) => {
    let cliped = activePage.split("/")[2];
    let cliped2 = link.href.split("/")[4];
    if (cliped2.includes(`${cliped}`)) {
      link.classList.add("active-tab");
    }
  });
}
//toggling for creating new space
const createSpaceBtn = document.getElementById("createSpaceBtn");
const createSpaceForm = document.querySelector(".createspace");
if (createSpaceBtn) {
  createSpaceBtn.addEventListener("click", () => {
    createSpaceForm.style.display = "flex";
  });
}

const spaceForm = document.querySelector("form");
if (spaceForm) {
  spaceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const course = document.getElementById("course").value;
    const firstp = document.getElementById("firstp").value;
    const list1 = document.getElementById("list1").value;
    const list2 = document.getElementById("list2").value;
    const list3 = document.getElementById("list3").value;
    const secondp = document.getElementById("secondp").value;
    const link = document.getElementById("link").value;
    createSpace(course, firstp, list1, list2, list3, secondp, link);
  });
}

// UPDATING USER ACCOUNTS
const userDataForm = document.querySelector(".profile_form");

if (userDataForm) {
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("firstname", document.getElementById("fname").value);
    form.append("lastname", document.getElementById("lname").value);
    form.append("email", document.getElementById("email").value);
    form.append("phone", document.getElementById("phone").value);
    form.append("gender", document.getElementById("gender").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSetting(form, "data");
  });
}

// CHANGING PASSWORD

const userPasswordForm = document.querySelector(".password_form");

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", (e) => {
    console.log(userPasswordForm);
    e.preventDefault();

    const passwordCurrent = document.getElementById("passwordCurrent").value;

    const password = document.getElementById("userpassword").value;

    const passwordConform = document.getElementById("passwordConform").value;

    updatePassword(passwordCurrent, password, passwordConform);
  });
}

const DelateMeBtn = document.querySelector(".danger-btn");
if (DelateMeBtn) {
  DelateMeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const url = "/user/deleteMe";
    deleteMe(url);
  });
}
/// --- LOADER __________
let loader = document.getElementById("preloader");
window.addEventListener("load", () => {
  loader.style.display = "none";
});

//------------COURSE ACTIONS-------------//////
// ---DELETE COURSE
const deleteCourseBtn = document.querySelectorAll(".deleteCourse");
if (deleteCourseBtn) {
  deleteCourseBtn.forEach((e) => {
    e.addEventListener("click", (a) => {
      a.preventDefault();
      const deleteUrl = e.href;

      deleteCourse(deleteUrl);
      console.log(deleteUrl);
    });
  });
}
// -- CREATE
const courseCreateForm = document.querySelector(".course-add-form");
if (courseCreateForm) {
  courseCreateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", document.getElementById("title").value);
    form.append("price", document.getElementById("price").value);
    form.append("description", document.getElementById("description").value);
    form.append("instructor", document.getElementById("instructor").value);
    form.append("photo", document.getElementById("photo").files[0]);
    createCourse(form, "data");
  });
}
// -- EDIT
const editCourseBtn = document.getElementById("a-href");
if (editCourseBtn) {
  const courseEditForm = document.querySelector(".course-edit-form");
  if (courseEditForm) {
    courseEditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = new FormData();
      form.append("title", document.getElementById("title").value);
      form.append("price", document.getElementById("price").value);
      form.append("description", document.getElementById("description").value);
      form.append("instructor", document.getElementById("instructor").value);
      form.append("photo", document.getElementById("photo").files[0]);
      const url = editCourseBtn.href;
      editCourse(form, url);
    });
  }
}

// --ENROL

const enrolBtn = document.getElementById("enrol-btn");
let enrolUrl = document.getElementById("enrol-url");
if (enrolBtn) {
  enrolBtn.addEventListener("click", () => {
    const url = enrolUrl.href;
    enrolCourse(url);
  });
}

//-----Be Hired
const hiredForm = document.querySelector(".motive-form");
if (hiredForm) {
  const courseId = window.location.pathname;
  const id = courseId.slice(courseId.lastIndexOf("/") + 1);
  // console.log(id);
  const cv = document.getElementById("cv");
  const motive = document.getElementById("motive");
  hiredForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const Form = new FormData();
    Form.append("motive", motive.value);

    Form.append("cv", cv.files[0]);

    getHired(Form, id);
  });
}

// --------- MANAGE ___ADMIN ______------

//APPROVE ENROL

const approveBtn = document.querySelectorAll(".approve");
const rejectBtn = document.querySelectorAll(".reject");
if (approveBtn) {
  approveBtn.forEach((e) => {
    const id = e.href.split("/")[4];
    e.addEventListener("click", (a) => {
      a.preventDefault();
      console.log(id);
      authorizeEnrol(id);
    });
  });
}
// REJECT ENROL
if (rejectBtn) {
  rejectBtn.forEach((e) => {
    const id = e.href.split("/")[4];
    e.addEventListener("click", (a) => {
      a.preventDefault();
      console.log(id);
      deleteEnrol(id);
    });
  });
}

//USER
const Uris = document.querySelectorAll(".uri");
if (Uris) {
  Uris.forEach((e) => {
    const id = e.href.split("/")[4];
    e.addEventListener("click", (a) => {
      a.preventDefault();
      deleteUser(id);
    });
  });
}

//------------ALGO NET __________________------

const questionForm = document.querySelector(".post-form");

if (questionForm) {
  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const Form = new FormData();
    Form.append("category", document.getElementById("category").value);
    Form.append("title", document.getElementById("title").value);
    Form.append("question", document.getElementById("question").value);
    Form.append("image", document.getElementById("image").files[0]);
    postQuestions(Form, "data");
  });
}
