import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAuthor,
  getAuthors,
  getFilteredAuthors,
  selectAuthors,
} from "../../../features/authorsSlice";
import { Navigate, useNavigate } from "react-router-dom";
import {
  selectActorsError,
  selectActorsLoading,
} from "../../../features/actorsSlice";
import { EmptyTable } from "../../UI/emptyTable/EptyTable";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
import { alertDelete } from "../../../hooks/alertDelet";
import { FilterBar } from "./../../filterBar/FilterBar";
import { selectTotalPages } from "./../../../features/authorsSlice";
import { PaginationMenuBar } from "../../paginationMenu/PaginationMenuBar";
export const AuthorsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});

  const [initialValues, setInitialValues] = useState({
    page: 1,
    limit: 10,
    sortBy: "id",
    sortOrder: "DESC",
    filterValue: "",
  });

  const authors = useSelector(selectAuthors);
  const authorsLoading = useSelector(selectActorsLoading);
  const authorsError = useSelector(selectActorsError);
  const totalPages = useSelector(selectTotalPages);
  useEffect(() => {
    dispatch(getFilteredAuthors(initialValues))
      .unwrap()
      .then((e) => {
        const { img, ...author } = e.authors[0];
        setAuthor(author);
      });
  }, [dispatch, initialValues]);

  return (
    <>
      {authorsError ? (
        <Navigate to="/error500" replace={true} />
      ) : authorsLoading ? (
        <MySpinnerLoader loading={authorsLoading} />
      ) : (
        <>
          <div className="w-100 d-flex justify-content-end alifn-items-center">
            <button
              className="btn btn-outline-success "
              onClick={() => navigate("add")}
            >
              Add New Author{" "}
              <i className="fa-sharp fa-solid fa-plus add-new-item"></i>
            </button>
          </div>
          <div className="w-100 p-2">
            <FilterBar
              film={author}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
            />
            {authors.length ? (
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
                      {authors.map((author) => {
                        return (
                          <tr key={author.id}>
                            <td>
                              <span className="bg-blight">{author.id}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{author.name}</span>
                            </td>
                            <td>
                              <span className="bg-blight">
                                {author.surname}
                              </span>
                            </td>
                            <td>
                              <span className="bg-bdark">{author.info}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {author.updatedAt}
                              </span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {author.createdAt}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn fa-solid fa-pen-to-square btn-outline-warning mx-1"
                                onClick={() => navigate("eddit/" + author.id)}
                              ></button>
                              <button
                                className="btn fa-sharp fa-solid fa-trash-can btn-outline-danger"
                                onClick={() => {
                                  alertDelete({
                                    dispatch,
                                    deleteitem: deleteAuthor,
                                    itemId: author.id,
                                    getItems: getAuthors,
                                    state: undefined,
                                    name: "Author",
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
              <EmptyTable name={"authors"} />
            )}
          </div>
        </>
      )}
    </>
  );
};
