import { showAlert } from "./alert.js";

const signUp = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/signup",
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "Signed up Successfully!");
      window.setTimeout(() => {
        location.assign("/home");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};
const signUpForm = document.querySelector("form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("firstname", document.getElementById("fname").value);
  form.append("lastname", document.getElementById("lname").value);
  form.append("email", document.getElementById("email").value);
  form.append("phone", document.getElementById("phone").value);
  form.append("gender", document.getElementById("gender").value);
  form.append("password", document.getElementById("password").value);
  form.append(
    "passwordConform",
    document.getElementById("passwordConform").value
  );
  form.append("photo", document.getElementById("photo").files[0]);

  signUp(form, "data");
});
