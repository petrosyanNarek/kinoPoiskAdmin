import Swal from "sweetalert2";

export const alertAdded = (name, next) => {
  let timerInterval;
  Swal.fire({
    title: `${name} added!`,
    html: `${name} will added  <b></b> milliseconds.`,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 2000);
    },

    willClose: () => {
      next()
      clearInterval(timerInterval);
    },
  });
};
