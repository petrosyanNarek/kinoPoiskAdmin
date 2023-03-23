import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  deleteCountries,
  getFilteredCountries,
  selectCountries,
  selectCountriesError,
  selectCountriesLoading,
  selectTotalPages,
} from "../../../features/countriesSlice";
import { alertDelete } from "../../../hooks/alertDelet";
import { FilterBar } from "../../filterBar/FilterBar";
import { PaginationMenuBar } from "../../paginationMenu/PaginationMenuBar";
import { EmptyTable } from "../../UI/emptyTable/EptyTable";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
import { getCountries } from "./../../../features/countriesSlice";
export const CountriesTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState({});

  const [initialValues, setInitialValues] = useState({
    page: 1,
    limit: 10,
    sortBy: "id",
    sortOrder: "DESC",
    filterValue: "",
  });
  const countries = useSelector(selectCountries);
  const countriesError = useSelector(selectCountriesError);
  const countriesLoading = useSelector(selectCountriesLoading);
  const totalPages = useSelector(selectTotalPages);
  useEffect(() => {
    dispatch(getFilteredCountries(initialValues))
      .unwrap()
      .then((e) => {
        const country = e.countries.length && e.countries[0];
        setCountry(country);
      });
    window.scrollTo(0, 0);
  }, [dispatch, initialValues]);
  return (
    <>
      {countriesError ? (
        <Navigate to="/error500" replace={true} />
      ) : countriesLoading ? (
        <MySpinnerLoader loading={countriesLoading} />
      ) : (
        <>
          <div className="w-100 d-flex justify-content-end alifn-items-center">
            <p className="p-0 m-0 mx-2"> </p>
            <button
              className="btn btn-outline-success "
              onClick={() => navigate("add")}
            >
              Add New Country{" "}
              <i className="fa-sharp fa-solid fa-plus add-new-item"></i>
            </button>
          </div>
          <div className="w-100 p-2">
            <FilterBar
              film={country}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
            />
            {countries.length ? (
              <>
                <div className="table-responsive px-2 mt-5  mb-5">
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
                      {countries.map((country) => {
                        return (
                          <tr key={country.id}>
                            <td>
                              <span className="bg-blight">{country.id}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{country.name}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {country.updatedAt}
                              </span>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {country.createdAt}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn fa-solid fa-pen-to-square btn-outline-warning mx-1"
                                onClick={() => navigate("eddit/" + country.id)}
                              ></button>
                              <button
                                className="btn fa-sharp fa-solid fa-trash-can btn-outline-danger"
                                onClick={() => {
                                  alertDelete({
                                    dispatch,
                                    deleteitem: deleteCountries,
                                    itemId: country.id,
                                    getItems: getCountries,
                                    state: undefined,
                                    name: "Country",
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
                      <div className="group mx-3 ">
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
              <EmptyTable name={"countries"} />
            )}
          </div>
        </>
      )}
    </>
  );
};
