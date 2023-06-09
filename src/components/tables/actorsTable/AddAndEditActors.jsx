import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { alertAdded } from "./../../../hooks/alertAdded";
import { alertEdited } from "./../../../hooks/alertEdited";
import { MySpinnerLoader } from "./../../UI/spinnerLoader/MySpinnerLoader";
import { Navigate } from "react-router-dom";
import {
  getActorById,
  newActor,
  selectActorsError,
  selectActorsLoading,
  updateActor,
} from "../../../features/actorsSlice";
import { ToastContainer } from "react-toastify";
import { toestyError, toestySuccess } from "../../UI/toasty/toastyCreater";
import { actorAuthorSchema } from "./../../../valiadtion/actorAuthorValidation";

export const AddAndEditActors = () => {
  const dispatch = useDispatch();
  const actorId = +useParams().id;
  const actorsLoading = useSelector(selectActorsLoading);
  const actorsError = useSelector(selectActorsError);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(actorAuthorSchema),
  });
  useEffect(() => {
    if (actorId) {
      dispatch(getActorById(actorId))
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
  }, [dispatch, actorId, setValue, reset]);
  const onSubmitHandler = (actor) => {
    if (!actorId) {
      dispatch(newActor(actor))
        .unwrap()
        .then((res) => {
          alertAdded("Actors", () => {
            toestySuccess(res);
          });
        })
        .catch((e) => {
          alertAdded("Actors", () => {
            toestyError(e.data ? e.data : "Network Error");
          });
        });
      reset();
    } else {
      alertEdited("Actors", () =>
        dispatch(updateActor({ actor, id: actorId }))
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
      {actorsLoading ? (
        <MySpinnerLoader loading={actorsLoading} />
      ) : actorsError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="new-film">
          <h2 className="text-center">
            {actorId ? "Edit Actor" : "Add Actor"}
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
                  Surname
                </label>
                <input
                  {...register("surname")}
                  placeholder="Surname..."
                  className="input"
                />
                {touchedFields.surname && errors.surname?.message && (
                  <div className="errors">{errors.surname?.message}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div className="w-75 text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Info
                </label>
                <textarea
                  {...register("info")}
                  placeholder="Info..."
                  className="input text-area"
                />
                {touchedFields.info && errors.info?.message && (
                  <div className="errors">{errors.info?.message}</div>
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
