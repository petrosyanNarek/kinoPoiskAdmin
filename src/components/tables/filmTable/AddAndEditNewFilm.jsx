import { MultiSelect } from "react-multi-select-component";
import "./tableFilms.scss";
import {
  getCategories,
  selectCategories,
} from "../../../features/categoriesSlice";
import { useSelector } from "react-redux";
import { getGenres, selectGenres } from "../../../features/genresSlice";
import {
  getCountries,
  selectCountries,
} from "../../../features/countriesSlice";
import { getActors, selectActors } from "../../../features/actorsSlice";
import { getAuthors, selectAuthors } from "../../../features/authorsSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduceMultiSelectArray } from "../../../hooks/reduceMultiSelectArray";
import { FilmSchema } from "./../../../valiadtion/filmValidation";

import {
  selectFilmById,
  getFilmByid,
  addNewFilm,
  editFilm,
} from "./../../../features/filmSlice";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { alertAdded } from "../../../hooks/alertAdded";
import { alertEdited } from "./../../../hooks/alertEdited";

export const AddAndEditFilm = () => {
  const [videoSelect, setVideoSelect] = useState(false);
  const [trailerSelect, setTrailerSelect] = useState(false);
  const [imgSelect, setImgSelect] = useState(false);
  const dispatch = useDispatch();
  const filmId = +useParams().id;
  const selectedFilm = useSelector(selectFilmById);
  const categories = useSelector(selectCategories);

  const multiActors = reduceMultiSelectArray(useSelector(selectActors));
  const multiAuthors = reduceMultiSelectArray(useSelector(selectAuthors));
  const multiGenres = reduceMultiSelectArray(useSelector(selectGenres));
  const multiCountries = reduceMultiSelectArray(useSelector(selectCountries));
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(FilmSchema(filmId)),
    defaultValues: {
      genres: [],
      countries: [],
      actors: [],
      authors: [],
      cardImg: {},
      trailer: {},
    },
  });
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getGenres());
    dispatch(getCountries());
    dispatch(getActors());
    dispatch(getAuthors());
    if (filmId) {
      dispatch(getFilmByid(filmId))
        .unwrap()
        .then((r) => {
          for (let key in r) {
            if (!Array.isArray(r[key])) {
              setValue(key, r[key]);
            } else {
              setValue(key, reduceMultiSelectArray(r[key]));
            }
          }
        });
    } else {
      reset();
    }
  }, [filmId, dispatch, setValue, reset]);
  const onSubmitHandler = (data) => {
    const film = {
      ...data,
      categoryId: +data.categoryId,
      createdYear: +data.createdYear,
    };
    if (!filmId) {
      dispatch(addNewFilm({ film }));
      alertAdded("Film");
      // reset();
    } else {
      dispatch(editFilm({ film, id: filmId }));
      alertEdited("Film");
    }
  };
  return (
    <div className="new-film mb-6">
      <h2 className="text-center">{filmId ? "Edit Film" : "Add Film"}</h2>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="group">
          <div className="w-75  text-primary">
            <label htmlFor="" className=" fw-bold m-3">
              Name
            </label>
            <input
              {...register("name")}
              placeholder="Name..."
              name="name"
              className="input"
            />
            {touchedFields.name && errors.name?.message && (
              <div className="errors">{errors.name?.message}</div>
            )}
          </div>
        </div>
        <div className="group">
          <div className="w-75  text-primary">
            <label htmlFor="" className=" fw-bold m-3">
              Short Description
            </label>
            <textarea
              {...register("shortDescription")}
              placeholder="Short Description..."
              name="shortDescription"
              className="input text-area"
            />
            {touchedFields.shortDescription &&
              errors.shortDescription?.message && (
                <div className="errors">{errors.shortDescription?.message}</div>
              )}
          </div>
        </div>
        <div className="group">
          <div className="w-75  text-primary">
            <label htmlFor="" className=" fw-bold m-3">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Description..."
              name="description"
              className="input text-area"
            />
            {touchedFields.description && errors.description?.message && (
              <div className="errors">{errors.description?.message}</div>
            )}
          </div>
        </div>
        <div className="group">
          <div className="w-75  text-primary">
            <label htmlFor="" className=" fw-bold m-3">
              Created Year
            </label>
            <input
              type="number"
              {...register("createdYear")}
              placeholder="Created Year..."
              name="createdYear"
              className="input"
            />
            {touchedFields.createdYear && errors.createdYear?.message && (
              <div className="errors">{errors.createdYear?.message}</div>
            )}
          </div>
        </div>
        <div className="group">
          <div className="w-75  text-primary">
            <label htmlFor="" className=" fw-bold m-3">
              Views
            </label>
            <input
              type="number"
              {...register("views")}
              placeholder="Views..."
              name="views"
              className="input"
            />
            {touchedFields.views && errors.views?.message && (
              <div className="errors">{errors.views?.message}</div>
            )}
          </div>
        </div>
        <div className="group">
          <div className="w-75  text-primary">
            <label htmlFor="" className=" fw-bold m-3">
              Rating
            </label>
            <input
              {...register("rating")}
              placeholder="Rating..."
              name="rating"
              className="input"
            />
            {touchedFields.rating && errors.rating?.message && (
              <div className="errors">{errors.rating?.message}</div>
            )}
          </div>
        </div>

        <div className="group ">
          <div className="w-75 text-center text-primary mt-2">
            <h6 className="fw-bold m-3 text-start">Select Category</h6>
            <select
              {...register("categoryId")}
              name="categoryId"
              className="form-select mt-4 select rounded-pill"
            >
              <optgroup label="Categories">
                {categories.map((cetegory) => (
                  <option key={cetegory.id} value={cetegory.id}>
                    {cetegory.name}
                  </option>
                ))}
              </optgroup>
            </select>
            {touchedFields.categoryId && errors.categoryId?.message && (
              <div className="errors">{errors.categoryId?.message}</div>
            )}
          </div>
        </div>
        <div className="group mt-2">
          <div className="w-75 text-center text-primary">
            <h6 className="fw-bold m-3 text-start">Select Genres</h6>
            <Controller
              name="genres"
              control={control}
              render={() => {
                return (
                  <>
                    <MultiSelect
                      className="w-100 mt-4 select"
                      options={multiGenres}
                      value={getValues("genres")}
                      onChange={(e) => {
                        setValue("genres", e);
                      }}
                      labelledBy="Genres"
                    />
                    {errors.genres?.message && (
                      <div className="errors">{errors.genres?.message}</div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="group">
          <div className="w-75 text-center text-primary mt-2">
            <h6 className="fw-bold m-3 text-start">Select Countries</h6>
            <Controller
              name="countries"
              control={control}
              render={() => {
                return (
                  <>
                    <MultiSelect
                      className="w-100 mt-4 select"
                      options={multiCountries}
                      value={getValues("countries")}
                      onChange={(e) => {
                        setValue("countries", e);
                      }}
                      labelledBy="Countries"
                    />
                    {errors.countries?.message && (
                      <div className="errors">{errors.countries?.message}</div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="group">
          <div className="w-75 text-center text-primary ">
            <h6 className="fw-bold m-3 text-start">Select Actors</h6>
            <Controller
              name="actors"
              control={control}
              render={() => {
                return (
                  <>
                    <MultiSelect
                      className="w-100 mt-4 select"
                      options={multiActors}
                      value={getValues("actors")}
                      onChange={(e) => {
                        setValue("actors", e);
                      }}
                      labelledBy="actors"
                    />
                    {errors.actors?.message && (
                      <div className="errors">{errors.actors?.message}</div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="group">
          <div className="w-75 text-center text-primary mt-2">
            <h6 className="fw-bold m-3 text-start">Select Authors</h6>
            <Controller
              name="authors"
              control={control}
              render={() => {
                return (
                  <>
                    <MultiSelect
                      className="w-100 mt-4 select"
                      options={multiAuthors}
                      value={getValues("authors")}
                      onChange={(e) => {
                        setValue("authors", e);
                      }}
                      labelledBy="Authors"
                    />
                    {errors.authors?.message && (
                      <div className="errors">{errors.authors?.message}</div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="group">
            <div className="w-75 text-center text-primary mt-2">
              {filmId > 0 && !imgSelect ? (
                <div className="w-100 d-flex justify-content-start px-5 mt-3 file-img-bar">
                  <button
                    type="button"
                    className="fa-solid fa-x btn btn-outline-danger"
                    onClick={() => setImgSelect(true)}
                  ></button>
                  <img src={selectedFilm?.cardImg} alt="" />
                </div>
              ) : (
                <>
                  <h6 className="fw-bold">Upload Img</h6>
                  <Controller
                    name="cardImg"
                    control={control}
                    render={() => {
                      return (
                        <>
                          <input
                            name="cardImg"
                            type="file"
                            className="input mt-2"
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                              setValue("cardImg", e.target.files[0]);
                            }}
                          />
                          {errors.cardImg?.message && (
                            <div className="errors">
                              {errors.cardImg?.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="group">
            <div className="w-75 text-center text-primary mt-2">
              {filmId > 0 && !trailerSelect ? (
                <div className="w-100 d-flex justify-content-start px-5 mt-3 file-video-bar">
                  <button
                    type="button"
                    className="fa-solid fa-x btn btn-outline-danger"
                    onClick={() => setTrailerSelect(true)}
                  ></button>
                  <video
                    src={selectedFilm?.trailer}
                    width="100%"
                    height="200px"
                    controls={true}
                  />
                </div>
              ) : (
                <>
                  <h6 className="fw-bold">Upload Trailer</h6>
                  <Controller
                    name="trailer"
                    control={control}
                    render={() => {
                      return (
                        <>
                          <input
                            type="file"
                            className="input"
                            accept="video/mp4"
                            onChange={(e) => {
                              setValue("trailer", e.target.files[0]);
                            }}
                          />
                          {errors.trailer?.message && (
                            <div className="errors">
                              {errors.trailer?.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="group">
            <div className="w-75 text-center text-primary mt-2">
              {filmId > 0 && !videoSelect ? (
                <div className="w-100 d-flex justify-content-start px-5 mt-3 file-video-bar">
                  <button
                    type="button"
                    className="fa-solid fa-x btn btn-outline-danger"
                    onClick={() => setVideoSelect(true)}
                  ></button>
                  <video
                    src={selectedFilm?.video}
                    width="100%"
                    height="200px"
                    controls={true}
                  />
                </div>
              ) : (
                <>
                  <h6 className="fw-bold">Upload Video</h6>
                  <Controller
                    name="video"
                    control={control}
                    render={() => {
                      return (
                        <>
                          <input
                            type="file"
                            className="input"
                            accept="video/mp4"
                            onChange={(e) => {
                              setValue("video", e.target.files[0]);
                            }}
                          />
                          {errors.video?.message && (
                            <div className="errors">
                              {errors.video?.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="group mt-5 mb-5">
          <div className="w-75 text-center text-primary mb-5">
            <button
              type="submit"
              className="w-100 fw-bold rounded-pill btn btn-primery serach-btn mb-5"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
