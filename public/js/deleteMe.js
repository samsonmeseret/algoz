import { showAlert } from "./alert.js";

export const deleteMe = (url) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        method: "DELETE",
        url: url,
        data: null,
      }).then(function () {
        showAlert("error", "You are No Longer Availabe!");
        window.setTimeout(() => {
          location.assign("/logout");
        }, 1500);
      });
    }
  });
};
