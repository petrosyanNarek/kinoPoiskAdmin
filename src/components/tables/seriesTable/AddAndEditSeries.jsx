import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getFilms, selectFilms } from "../../../features/filmSlice";
import {
  getSeriesById,
  newSeries,
  selectSeriesError,
  selectSeriesLoading,
  selectSeria,
  updateSeries,
} from "../../../features/seriesSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { alertAdded } from "../../../hooks/alertAdded";
import { alertEdited } from "../../../hooks/alertEdited";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
const seriesSchema = yup.object().shape({
  name: yup.string().required("Name is a required !!!"),
  shortDescription: yup
    .string()
    .required("Short Description is a required !!!"),
  description: yup.string().required("Description is required"),
  rating: yup.number().min(0).max(5).required("Rating is required"),
  views: yup.number().min(0).required("Views is required"),
  filmId: yup.number().min(1).required("Category is required"),
  part: yup.number().min(1).required("Part is required"),
});
export const AddAndEditSeries = () => {
  const [videoSelect, setVideoSelect] = useState(false);
  const [trailerSelect, setTrailerSelect] = useState(false);
  const [imgSelect, setImgSelect] = useState(false);
  const dispatch = useDispatch();
  const seriaId = +useParams().id;
  const selectedSeries = useSelector(selectSeria);
  const seriesError = useSelector(selectSeriesError);
  const seriesLoading = useSelector(selectSeriesLoading);
  const films = useSelector(selectFilms);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(seriesSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    dispatch(getFilms());
    if (seriaId) {
      dispatch(getSeriesById(seriaId))
        .unwrap()
        .then((r) => {
          for (let key in r) {
            setValue(key, r[key]);
          }
        })
        .catch((e) => console.log(e));
    } else {
      reset();
    }
  }, [dispatch, seriaId, setValue, reset]);
  const onSubmitHandler = (seria) => {
    if (!seriaId) {
      dispatch(newSeries(seria));
      alertAdded("Series");
      reset();
    } else {
      alertEdited("Series", () =>
        dispatch(updateSeries({ seria, id: seriaId }))
      );
    }
  };
  return (
    <>
      {seriesLoading ? (
        <MySpinnerLoader loading={seriesLoading} />
      ) : seriesError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="new-film mb-5">
          <h2 className="text-center">
            {seriaId ? "Edit Seria" : "Add Seria"}
          </h2>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Name
                </label>
                <input
                  {...register("name")}
                  placeholder="Name..."
                  className="input"
                />
                {touchedFields.name && errors.name?.message && (
                  <div className="errors">{errors.name?.message}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Short Description
                </label>
                <textarea
                  {...register("shortDescription")}
                  placeholder="Short Description..."
                  className="input text-area"
                />
                {touchedFields.shortDescription &&
                  errors.shortDescription?.message && (
                    <div className="errors">
                      {errors.shortDescription?.message}
                    </div>
                  )}
              </div>
            </div>
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Description..."
                  className="input text-area"
                />
                {touchedFields.description && errors.description?.message && (
                  <div className="errors">{errors.description?.message}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Views
                </label>
                <input
                  {...register("views")}
                  placeholder="Views..."
                  className="input"
                />
                {touchedFields.views && errors.views?.message && (
                  <div className="errors">{errors.views?.message}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Rating
                </label>
                <input
                  {...register("rating")}
                  placeholder="Rating..."
                  className="input"
                />
                {touchedFields.rating && errors.rating?.message && (
                  <div className="errors">{errors.rating?.message}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div className="w-75 text-center text-primary mt-2">
                <h6 className="fw-bold m-3 text-start">Select Film</h6>
                <select
                  {...register("filmId")}
                  name="filmId"
                  className="form-select mt-4 select rounded-pill"
                >
                  <optgroup label="films"></optgroup>
                  {films.map((film) => (
                    <option key={film.id} value={film.id}>
                      {film.name}
                    </option>
                  ))}
                </select>
                {touchedFields.filmId && errors.filmId?.message && (
                  <div className="errors">{errors.filmId?.message}</div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="group">
                <div className="w-75 text-center text-primary mt-2">
                  {seriaId > 0 && !imgSelect ? (
                    <div className="w-100 d-flex justify-content-start px-5 mt-3 file-img-bar">
                      <button
                        type="button"
                        className="fa-solid fa-x btn btn-outline-danger"
                        onClick={() => setImgSelect(true)}
                      ></button>
                      <img src={selectedSeries?.cardImg} alt="" />
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
                  {seriaId > 0 && !trailerSelect ? (
                    <div className="w-100 d-flex justify-content-start px-5 mt-3 file-video-bar">
                      <button
                        type="button"
                        className="fa-solid fa-x btn btn-outline-danger"
                        onClick={() => setTrailerSelect(true)}
                      ></button>
                      <video
                        src={
                          process.env.REACT_APP_HOST + selectedSeries?.trailer
                        }
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
                  {seriaId > 0 && !videoSelect ? (
                    <div className="w-100 d-flex justify-content-start px-5 mt-3 file-video-bar">
                      <button
                        type="button"
                        className="fa-solid fa-x btn btn-outline-danger"
                        onClick={() => setVideoSelect(true)}
                      ></button>
                      <video
                        src={process.env.REACT_APP_HOST + selectedSeries?.video}
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
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Sezon
                </label>
                <input
                  {...register("sezon")}
                  placeholder="Sezon..."
                  className="input"
                />
                {touchedFields.sezon && errors.sezon?.message && (
                  <div className="errors">{errors.sezon?.message}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Part
                </label>
                <input
                  {...register("part")}
                  placeholder="Part..."
                  className="input"
                />
                {touchedFields.part && errors.part?.message && (
                  <div className="errors">{errors.part?.message}</div>
                )}
              </div>
            </div>
            <div className="group mt-5">
              <div className="w-75 text-center text-primary">
                <button type="submit" className="btn btn-primery serach-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
