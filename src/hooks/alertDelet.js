import Swal from "sweetalert2"

export const alertDelete = ({ dispatch, deleteitem, itemId, getItems, state, name }) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-danger mx-2',
            cancelButton: 'btn btn-success'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteitem(itemId)).unwrap().then(r => {
                dispatch(getItems())
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    name + ' has been deleted.',
                    'success'
                )
            }).catch(r => {
                swalWithBootstrapButtons.fire(
                    'Error',
                    'Failed, please try again :)',
                    'error'
                )
            })
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                `Your ${name} is safe :)`,
                'error'
            )
        }
    })
}