import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilmById,
  getFilteredFilms,
  selectFilms,
  selectTotalPages,
} from "../../../features/filmSlice";
import { FilterBar } from "./../../filterBar/FilterBar";
import { PaginationMenuBar } from "../../paginationMenu/PaginationMenuBar";
import { useNavigate } from "react-router-dom";
import { alertDelete } from "./../../../hooks/alertDelet";
import { EmptyTable } from "../../UI/emptyTable/EptyTable";

export const FilmTable = () => {
  const [film, setFilm] = useState({});
  const [initialValues, setInitialValues] = useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "DESC",
    filterValue: "",
    genres: [],
    countries: [],
    actors: [],
    authors: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const films = useSelector(selectFilms);

  const totalPages = useSelector(selectTotalPages);
  useEffect(() => {
    dispatch(getFilteredFilms(initialValues))
      .unwrap()
      .then((e) => {
        const {
          cardImg,
          video,
          trailer,
          sliderImg,
          updatedAt,
          genres,
          countries,
          actors,
          authors,
          ...film
        } = e.films.length && e.films[0];
        setFilm(film);
      });
    window.scrollTo(0, 0);
  }, [dispatch, initialValues]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="w-100 d-flex justify-content-end alifn-items-center">
        <button
          className="btn btn-outline-success"
          onClick={() => {
            navigate("add");
          }}
        >
          Add New Film{" "}
          <i className="fa-sharp fa-solid fa-plus add-new-item"></i>
        </button>
      </div>
      <div className="w-100 p-2">
        <FilterBar
          dispatch={dispatch}
          film={film}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        {films.length ? (
          <>
            <div className="table-responsive px-2  mb-5 table-db-items">
              <table className="table table-borderless">
                <thead className="table-thead">
                  <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">
                      Category<span>ID</span>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col"> Year</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Genres(s)</th>
                    <th scope="col">Countrie(s)</th>
                    <th scope="col">Actors(s)</th>
                    <th scope="col">Author(s)</th>
                    <th scope="col">Card Img</th>
                    <th scope="col">Trailer</th>
                    <th scope="col">Video</th>
                    <th scope="col">Short Description</th>
                    <th className="text-center" scope="col">
                      Description
                    </th>
                    <th className="text-center" scope="col">
                      Views
                    </th>
                    <th className="text-center" scope="col">
                      Created At
                    </th>
                    <th className="text-center" scope="col">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {films.map((film, i) => {
                    return (
                      <tr key={film.id}>
                        <td>
                          <span className="bg-blight">{film.id}</span>
                        </td>
                        <td>
                          <span className="bg-blight">{film.categoryId}</span>
                        </td>
                        <td>
                          <span className="bg-bdark">{film.name}</span>
                        </td>
                        <td>
                          <span className="bg-blight">{film.createdYear}</span>
                        </td>
                        <td>
                          <span className="bg-bdark">{film.rating}</span>
                        </td>
                        <td>
                          <ul>
                            {film.genres.map((genre) => (
                              <li key={genre.id}>{genre.name}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {film.countries.map((country) => (
                              <li key={country.id}>{country.name}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {film.actors.map((actor) => (
                              <li key={actor.id}>
                                {actor.name + " " + actor.surname}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {film.authors.map((author) => (
                              <li key={author.id}>
                                {author.name + " " + author.surname}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <img
                            src={process.env.REACT_APP_HOST + film.cardImg}
                            alt=""
                            style={{ width: "200px", height: "200px" }}
                          />
                        </td>
                        <td>
                          <video
                            src={process.env.REACT_APP_HOST + film.trailer}
                            controls={true}
                            height="200px"
                            width="356px"
                          ></video>
                        </td>
                        <td>
                          <video
                            src={process.env.REACT_APP_HOST + film.video}
                            controls={true}
                            height="200px"
                            width="356px"
                          ></video>
                        </td>
                        <td>
                          <span className="bg-bdark">
                            {film.shortDescription}
                          </span>
                        </td>
                        <td className="text-center px-0">
                          <span>{film.description}</span>
                        </td>
                        <td className="text-center">
                          <span>{film.views}</span>
                        </td>
                        <td className="text-center">
                          <span>{film.createdAt}</span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn fa-solid fa-pen-to-square btn-outline-warning mx-1"
                            onClick={() => navigate("eddit/" + film.id)}
                          ></button>
                          <button
                            className="btn fa-sharp fa-solid fa-trash-can btn-outline-danger mt-2"
                            onClick={() => {
                              alertDelete({
                                dispatch,
                                deleteitem: deleteFilmById,
                                itemId: film.id,
                                getItems: getFilteredFilms,
                                state: initialValues,
                                name: "Film",
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
            <div className="d-flex w-100 justify-content-center align-items-center mt-5">
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
          <EmptyTable name={"mowies"} />
        )}
      </div>
    </>
  );
};
