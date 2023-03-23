import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  deleteActor,
  getFilteredActors,
  selectActors,
  selectActorsError,
  selectActorsLoading,
  selectTotalPages,
} from "../../../features/actorsSlice";
import { alertDelete } from "../../../hooks/alertDelet";
import { FilterBar } from "../../filterBar/FilterBar";
import { PaginationMenuBar } from "../../paginationMenu/PaginationMenuBar";
import { EmptyTable } from "../../UI/emptyTable/EptyTable";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
import { getActors } from "./../../../features/actorsSlice";

export const ActorsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [actor, setActor] = useState({});

  const [initialValues, setInitialValues] = useState({
    page: 1,
    limit: 10,
    sortBy: "id",
    sortOrder: "DESC",
    filterValue: "",
  });

  const actors = useSelector(selectActors);
  const actorsError = useSelector(selectActorsError);
  const actorsLoading = useSelector(selectActorsLoading);
  const totalPages = useSelector(selectTotalPages);
  useEffect(() => {
    dispatch(getFilteredActors(initialValues))
      .unwrap()
      .then((e) => {
        const { img, ...actor } = e.actors[0];
        setActor(actor);
      });
    window.scrollTo(0, 0);
  }, [dispatch, initialValues]);
  return (
    <>
      {actorsError ? (
        <Navigate to="/error500" replace={true} />
      ) : actorsLoading ? (
        <MySpinnerLoader loading={actorsLoading} />
      ) : (
        <>
          <div className="w-100 d-flex justify-content-end alifn-items-center">
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("add")}
            >
              Add New Actor{" "}
              <i className="fa-sharp fa-solid fa-plus add-new-item"></i>
            </button>
          </div>
          <div className="w-100 p-2">
            <FilterBar
              film={actor}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
            />
            {actors.length ? (
              <>
                <div className="table-responsive px-2 mb-5">
                  <table className="table table-borderless">
                    <thead className="table-thead">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Info</th>
                        <th scope="col">UpdatedAt</th>
                        <th scope="col">CreatedAt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actors.map((actor) => {
                        return (
                          <tr key={actor.id}>
                            <td>
                              <span className="bg-blight">{actor.id}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{actor.name}</span>
                            </td>
                            <td>
                              <span className="bg-blight">{actor.surname}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{actor.info}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {actor.updatedAt}
                              </span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {actor.createdAt}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn fa-solid fa-pen-to-square btn-outline-warning mx-1"
                                onClick={() => navigate("eddit/" + actor.id)}
                              ></button>
                              <button
                                className="btn fa-sharp fa-solid fa-trash-can btn-outline-danger"
                                onClick={() => {
                                  alertDelete({
                                    dispatch,
                                    deleteitem: deleteActor,
                                    itemId: actor.id,
                                    getItems: getActors,
                                    state: undefined,
                                    name: "Actor",
                                  });
                                }}
                              ></button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex w-100 justify-content-center align-items-center">
                  {totalPages.length > 1 && (
                    <>
                      <div className="group mx-3">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                          <span className="w-50 mx-2">Limit:</span>
                          <select
                            as="select"
                            name="limit"
                            className="form-select"
                            onChange={(e) => {
                              setInitialValues({
                                ...initialValues,
                                limit: +e.target.value,
                              });
                            }}
                          >
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                          </select>
                        </div>
                      </div>
                      <PaginationMenuBar
                        pagItems={totalPages}
                        initialValues={initialValues}
                        setInitialValues={setInitialValues}
                      />
                    </>
                  )}
                </div>
              </>
            ) : (
              <EmptyTable name={"actors"} />
            )}
          </div>
        </>
      )}
    </>
  );
};
