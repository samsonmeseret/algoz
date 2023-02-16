import { showAlert } from "./alert.js";

export const createSpace = async (
  course,
  firstp,
  list1,
  list2,
  list3,
  secondp,
  link
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/studyboard",
      data: {
        course,
        firstp,
        list1,
        list2,
        list3,
        secondp,
        link,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "studyspace created Successfully!");
      window.setTimeout(() => {
        location.assign("/student/studyboard");
      }, 1500);
    }
    console.log(res.data);
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};

// document.querySelector("form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   const course = document.getElementById("course").value;
//   const firstp = document.getElementById("firstp").value;
//   const list1 = document.getElementById("list1").value;
//   const list2 = document.getElementById("list2").value;
//   const list3 = document.getElementById("list3").value;
//   const secondp = document.getElementById("secondp").value;
//   const link = document.getElementById("link").value;
//   createSpace(course, firstp, list1, list2, list3, secondp, link);
// });

// const createSpaceFunction = () => {
//   const createSpaceBtn = document.getElementById("createSpaceBtn");
//   const createSpaceForm = document.querySelector(".createspace");
//   createSpaceBtn.addEventListener("click", () => {
//     createSpaceForm.style.display = "flex";
//     console.log("flexxxxxxxxxx");
//   });
// };
