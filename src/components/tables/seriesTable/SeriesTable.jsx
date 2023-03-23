import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteSeries,
  selectSeries,
  getSeries,
  selectSeriesError,
  selectSeriesLoading,
  getFiltededSeries,
  selectTotalPages,
} from "./../../../features/seriesSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
import { EmptyTable } from "../../UI/emptyTable/EptyTable";
import { alertDelete } from "../../../hooks/alertDelet";
import { FilterBar } from "../../filterBar/FilterBar";
import { PaginationMenuBar } from "../../paginationMenu/PaginationMenuBar";
export const SeriesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seria, setSeria] = useState({});

  const series = useSelector(selectSeries);
  const seriesError = useSelector(selectSeriesError);
  const seriesLoading = useSelector(selectSeriesLoading);
  const totalPages = useSelector(selectTotalPages);
  const [initialValues, setInitialValues] = useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  useEffect(() => {
    dispatch(getFiltededSeries(initialValues))
      .unwrap()
      .then((e) => {
        const { cardImg, video, trailer, sliderImg, updatedAt, ...seria } =
          e.series[0];
        setSeria(seria);
      });
    window.scrollTo(0, 0);
  }, [dispatch, initialValues]);
  return (
    <>
      {seriesError ? (
        <Navigate to="/error500" replace={true} />
      ) : seriesLoading ? (
        <MySpinnerLoader loading={seriesLoading} />
      ) : (
        <>
          <div className="w-100 d-flex justify-content-end alifn-items-center">
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("add")}
            >
              Add New Series{" "}
              <i className="fa-sharp fa-solid fa-plus add-new-item"></i>
            </button>
          </div>

          <div className="w-100 p-2">
            <FilterBar
              dispatch={dispatch}
              film={seria}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
            />
            {series.length ? (
              <>
                <div className="table-responsive px-2  mt-5">
                  <table className="table table-borderless">
                    <thead className="table-thead">
                      <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">FilmID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Sezon</th>
                        <th scope="col">Part</th>
                        <th scope="col">Card Img</th>
                        <th scope="col">Trailer</th>
                        <th scope="col">Video</th>
                        <th scope="col">Short Description</th>
                        <th className="text-center" scope="col">
                          Description
                        </th>
                        <th scope="col">Rating</th>
                        <th className="text-center" scope="col">
                          Views
                        </th>
                        <th className="text-center" scope="col">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {series.map((seria, i) => {
                        return (
                          <tr key={seria.id}>
                            <td>
                              <span className="bg-blight">{seria.id}</span>
                            </td>
                            <td>
                              <span className="bg-blight">{seria.filmId}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{seria.name}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{seria.sezon}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{seria.part}</span>
                            </td>
                            <td>
                              <img
                                src={process.env.REACT_APP_HOST + seria.cardImg}
                                alt=""
                                style={{ width: "200px", height: "200px" }}
                              />
                            </td>
                            <td>
                              <video
                                src={process.env.REACT_APP_HOST + seria.trailer}
                                controls={true}
                                height="200px"
                                width="356px"
                              ></video>
                            </td>
                            <td>
                              <video
                                src={process.env.REACT_APP_HOST + seria.video}
                                controls={true}
                                height="200px"
                                width="356px"
                              ></video>
                            </td>
                            <td>
                              <span className="bg-bdark">
                                {seria.shortDescription}
                              </span>
                            </td>
                            <td className="text-center px-0">
                              <span>{seria.description}</span>
                            </td>
                            <td>
                              <span className="bg-bdark">{seria.rating}</span>
                            </td>
                            <td className="text-center">
                              <span>{seria.views}</span>
                            </td>
                            <td className="text-center">
                              <span>{seria.createdAt}</span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn fa-solid fa-pen-to-square btn-outline-warning mx-1"
                                onClick={() => navigate("eddit/" + seria.id)}
                              ></button>
                              <button
                                className="btn fa-sharp fa-solid fa-trash-can btn-outline-danger"
                                onClick={() => {
                                  alertDelete({
                                    dispatch,
                                    deleteitem: deleteSeries,
                                    itemId: seria.id,
                                    getItems: getSeries,
                                    state: undefined,
                                    name: "Seria",
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
                <div className="d-flex w-100 justify-content-center align-items-center mt-4">
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
                        getFilmBy={getFiltededSeries}
                        pagItems={totalPages}
                        initialValues={initialValues}
                        setInitialValues={setInitialValues}
                      />
                    </>
                  )}
                </div>
              </>
            ) : (
              <EmptyTable name={"series"} />
            )}
          </div>
        </>
      )}
    </>
  );
};
