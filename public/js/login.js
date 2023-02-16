import { showAlert } from "./alert.js";

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "logged in Successfully!");
      window.setTimeout(() => {
        location.assign("/home");
      }, 1500);
    }
    console.log(res.data);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
