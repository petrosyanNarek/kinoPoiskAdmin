import {
  deleteCategories,
  getCategories,
  getFilteredCategories,
  selectCategories,
  selectCategoriesError,
  selectTotalPages,
} from "../../../features/categoriesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { alertDelete } from "../../../hooks/alertDelet";
import { EmptyTable } from "../../UI/emptyTable/EptyTable";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { selectCategoriesLoading } from "./../../../features/categoriesSlice";
import { MySpinnerLoader } from "./../../UI/spinnerLoader/MySpinnerLoader";
import { FilterBar } from "../../filterBar/FilterBar";
import { PaginationMenuBar } from "../../paginationMenu/PaginationMenuBar";

export const CategoriesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});

  const [initialValues, setInitialValues] = useState({
    page: 1,
    limit: 10,
    sortBy: "id",
    sortOrder: "DESC",
    filterValue: "",
  });

  const categories = useSelector(selectCategories);
  const categoriesError = useSelector(selectCategoriesError);
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(getFilteredCategories(initialValues))
      .unwrap()
      .then((e) => {
        const category = e.categories.length && e.categories[0];
        setCategory(category);
      });
  }, [dispatch, initialValues]);

  return (
    <>
      {categoriesError ? (
        <Navigate to="/error500" replace={true} />
      ) : categoriesLoading ? (
        <MySpinnerLoader loading={categoriesLoading} />
      ) : (
        <>
          <div className="w-100 d-flex justify-content-end alifn-items-center">
            <button
              className="btn btn-outline-success "
              onClick={() => navigate("add")}
            >
              Add New Category{" "}
              <i className="fa-sharp fa-solid fa-plus add-new-item"></i>
            </button>
          </div>

          <div className="w-100 p-2">
            <FilterBar
              film={category}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
            />
            {categories.length ? (
              <>
                <div className="table-responsive px-2  mb-5">
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
                      {categories.map((category) => {
                        return (
                          <tr key={category.id}>
                            <td>
                              <span className="bg-blight">{category.id}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{category.name}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {category.updatedAt}
                              </span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {category.createdAt}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn fa-solid fa-pen-to-square btn-outline-warning mx-1"
                                onClick={() => navigate("eddit/" + category.id)}
                              ></button>
                              <button
                                className="btn fa-sharp fa-solid fa-trash-can btn-outline-danger"
                                onClick={() => {
                                  alertDelete({
                                    dispatch,
                                    deleteitem: deleteCategories,
                                    itemId: category.id,
                                    getItems: getCategories,
                                    state: undefined,
                                    name: "Category",
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
              <EmptyTable name={"categories"} />
            )}
          </div>
        </>
      )}
    </>
  );
};
