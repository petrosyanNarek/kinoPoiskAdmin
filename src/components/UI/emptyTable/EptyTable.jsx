export const EmptyTable = ({ name }) => {
    return (
        <div className="w-100 d-flex justify-content-center align-items-center p-4">
            <h2 className="fw-lighter">
                The {name} table is currently empty
            </h2>
        </div>
    )
}