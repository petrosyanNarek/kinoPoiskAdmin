import {
  deleteGenres,
  getFilteredGenres,
  getGenres,
  selectGenres,
  selectGenresError,
  selectGenresLoading,
  selectTotalPages,
} from "../../../features/genresSlice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
import { alertDelete } from "../../../hooks/alertDelet";
import { EmptyTable } from "../../UI/emptyTable/EptyTable";
import { PaginationMenuBar } from "../../paginationMenu/PaginationMenuBar";
import { FilterBar } from "../../filterBar/FilterBar";
export const GenresTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genre, SetGenre] = useState({});

  const [initialValues, setInitialValues] = useState({
    page: 1,
    limit: 10,
    sortBy: "id",
    sortOrder: "DESC",
    filterValue: "",
  });

  const genres = useSelector(selectGenres);
  const genresError = useSelector(selectGenresError);
  const genresLoading = useSelector(selectGenresLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(getFilteredGenres(initialValues))
      .unwrap()
      .then((e) => {
        const genre = e.genres.length && e.genres[0];
        SetGenre(genre);
      });
  }, [dispatch, initialValues]);
  return (
    <>
      {genresError ? (
        <Navigate to="/error500" replace={true} />
      ) : genresLoading ? (
        <MySpinnerLoader loading={genresLoading} />
      ) : (
        <>
          <div className="w-100 d-flex justify-content-end alifn-items-center">
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("add")}
            >
              Add New Genre{" "}
              <i className="fa-sharp fa-solid fa-plus add-new-item"></i>
            </button>
          </div>
          <div className="w-100 p-2">
            <FilterBar
              film={genre}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
            />
            {genres.length ? (
              <>
                <div className="table-responsive px-2">
                  <table className="table table-borderless">
                    <thead className="table-thead">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">UpdatedAt</th>
                        <th scope="col">CreatedAt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {genres.map((genre) => {
                        return (
                          <tr key={genre.id}>
                            <td>
                              <span className="bg-blight">{genre.id}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{genre.name}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {genre.updatedAt}
                              </span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {genre.createdAt}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn fa-solid fa-pen-to-square btn-outline-warning mx-1"
                                data-bs-toggle="modal"
                                data-bs-target="#editGenres"
                                onClick={() => navigate("eddit/" + genre.id)}
                              ></button>
                              <button
                                className="btn fa-sharp fa-solid fa-trash-can btn-outline-danger"
                                onClick={() => {
                                  alertDelete({
                                    dispatch,
                                    deleteitem: deleteGenres,
                                    itemId: genre.id,
                                    getItems: getGenres,
                                    state: undefined,
                                    name: "Genre",
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
              <EmptyTable name={"genres"} />
            )}
          </div>
        </>
      )}
    </>
  );
};
