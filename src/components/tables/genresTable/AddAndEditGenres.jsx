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
import { ToastContainer } from "react-toastify";
import { anySchema } from "../../../valiadtion/anyTablesValidation";
import { toestyError, toestySuccess } from "../../UI/toasty/toastyCreater";
import { regexp } from "../../../valiadtion/regexpValidation";
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
    resolver: yupResolver(
      anySchema("Genre", 3, 15, {
        test: regexp.name.reg,
        message: regexp.name.message,
      })
    ),
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
        });
    } else {
      reset();
    }
  }, [dispatch, genreId, setValue, reset]);
  const onSubmitHandler = async (genre) => {
    if (!genreId) {
      dispatch(newGenres(genre))
        .unwrap()
        .then((res) => {
          alertAdded("Genres", () => {
            toestySuccess(res);
          });
        })
        .catch((e) => {
          alertAdded("Genres", () => {
            toestyError(e.data ? e.data : "Network Error");
          });
        });
      reset();
    } else {
      alertEdited("Genres", () =>
        dispatch(updateGenres({ genre, id: genreId }))
          .unwrap()
          .then((res) => {
            toestySuccess(res);
          })
          .catch((e) => {
            toestyError(e.data ? e.data : "Network Error");
          })
      );
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
