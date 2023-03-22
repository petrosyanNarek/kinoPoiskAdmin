import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { alertEdited } from "../../../hooks/alertEdited";
import {
  getGenresById,
  newGenres,
  selectGenresLoading,
  updateGenres,
} from "../../../features/genresSlice";
import { Navigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { alertAdded } from "../../../hooks/alertAdded";
import { selectCategoriesError } from "../../../features/categoriesSlice";
import { useEffect } from "react";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
const genresSchema = yup.object().shape({
  name: yup.string().required("Name is a required !!!"),
});
export const AddAndEditGenres = () => {
  const genreId = +useParams().id;
  const dispatch = useDispatch();
  const genresLoading = useSelector(selectGenresLoading);
  const genresError = useSelector(selectCategoriesError);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(genresSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (genreId) {
      dispatch(getGenresById(genreId))
        .unwrap()
        .then((r) => {
          setValue("name", r.name);
        })
        .catch((e) => console.log(e));
    } else {
      reset();
    }
  }, [dispatch, genreId, setValue, reset]);
  const onSubmitHandler = (genre) => {
    if (!genreId) {
      dispatch(newGenres(genre));
      alertAdded("Genres");
      reset();
    } else {
      alertEdited("Genres", () =>
        dispatch(updateGenres({ genre, id: genreId }))
      );
    }
  };
  return (
    <>
      {genresLoading ? (
        <MySpinnerLoader loading={genresLoading} />
      ) : genresError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="new-film">
          <h2 className="text-center">
            {genreId ? "Edit Genre" : "Add Genre"}
          </h2>
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
            <div className="group mt-5">
              <div className="w-75 text-center text-primary">
                <button
                  type="submit"
                  className="w-100 fw-bold rounded-pill btn btn-primery serach-btn"
                >
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
