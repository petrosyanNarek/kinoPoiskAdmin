import * as yup from "yup";
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
const actorsSchema = yup.object().shape({
  name: yup.string().required("Name is a required !!!"),
  surname: yup.string().required("surname is a required !!!"),
  info: yup.string().required("info is a required !!!"),
});
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
    resolver: yupResolver(actorsSchema),
    defaultValues: {
      name: "",
    },
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
      dispatch(newActor(actor));
      alertAdded("Actors");
      reset();
    } else {
      dispatch(updateActor({ actor, id: actorId }));
      alertEdited("Actors");
    }
  };
  return (
    <>
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
