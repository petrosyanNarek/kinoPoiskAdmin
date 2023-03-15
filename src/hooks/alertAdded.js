import Swal from "sweetalert2"

export const alertAdded = (name) => {
    let timerInterval
    Swal.fire({
        title: `${name} added!`,
        html: `${name} will added  <b></b> milliseconds.`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}