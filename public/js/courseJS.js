// import { showAlert } from "./alert.js";

export const deleteCourse = (deleteUrl) => {
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
      // SENDING DELETE REQUEST

      axios({
        method: "DELETE",
        url: deleteUrl,
      })
        .then(function (res) {
          console.log(res.data.status);
          if (res.data.status === "success") {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            window.setTimeout(() => {
              location.assign("/course");
            }, 1500);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });
};
