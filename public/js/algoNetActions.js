import { showAlert, autoCloseAlert } from "./alert.js";

export const postQuestions = async (data) => {
  try {
    axios({
      method: "POST",
      url: "/algonet/Questions",
      data,
    })
      .then((res) => {
        if (res.data.status === "success") {
          autoCloseAlert();
          window.location.assign("/algonet/questions");
        }
      })
      .catch((err) => {
        showAlert("error", err.response.data.message);
      });
  } catch (error) {
    showAlert("error", error);
  }
};
// export const postAnswer = async(data)=>{
//     try {
//         axios({
//             method: "POST",
//             url: "/algonet/:id",
//             data,
//           })
//             .then((res) => {
//               if (res.data.status === "success") {
//                 autoCloseAlert();
//                 window.location.assign("/algonet");
//               }
//             })
//             .catch((err) => {
//               showAlert("error", err.response.data.message);
//             });
//     } catch (error) {
//         showAlert("error", error);
//     }
// }
