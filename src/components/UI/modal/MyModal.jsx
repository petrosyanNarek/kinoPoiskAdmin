import './myModal.scss'

export const MyModal = (props) => {
    return (
        <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header" >
                        <h5 className="modal-title" id="exampleModalLabel">{props.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}