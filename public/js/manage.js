import { showAlert } from "./alert.js";

export const authorizeEnrol = async (id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/enrol/${id}/authorize`,
    });
    if (res.data.status === "success") {
      Swal.fire(
        "Congratulations !",
        "You have Authorized a Student to Attend a Class",
        "success"
      );
      window.setTimeout(() => {
        location.assign("/manage/enrol");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteEnrol = (id) => {
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
        url: `/enrol/${id}`,
      })
        .then(function (res) {
          console.log(res.data.status);
          if (res.data.status === "success") {
            Swal.fire("Deleted", "Enrol has been deleted.", "success");
            window.setTimeout(() => {
              location.assign("/manage/enrol");
            }, 1500);
          }
        })
        .catch(function (err) {
          showAlert("error", err.response.data.message);
        });
    }
  });
};

export const deleteUser = (id) => {
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
        url: `/manage/users/${id}`,
      })
        .then(function (response) {
          console.log(response.data.status);
          if (response.data.status === "success") {
            Swal.fire("Deleted", "Enrol has been deleted.", "success");
            window.setTimeout(() => {
              location.assign("/manage/users");
            }, 1500);
          } else {
            console.log("problem with the status");
          }
        })
        .catch(function (err) {
          showAlert("error", err.response.data.message);
        });
    }
  });
};

export const editUser = () => {};
