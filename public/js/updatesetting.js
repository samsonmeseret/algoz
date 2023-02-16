import { showAlert } from "./alert.js";

export const updateSetting = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/user/updateme",
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "Account updated Successfully!");
      window.setTimeout(() => {
        location.assign("/my/settings");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConform
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/user/updatemypassword",
      data: { passwordCurrent, password, passwordConform },
    });
    if (res.data.status === "success") {
      showAlert("success", "Your Password is updated Successfully!");
      window.setTimeout(() => {
        location.assign("/logout");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
