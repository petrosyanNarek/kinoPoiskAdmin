import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthorById,
  newAuthor,
  selectAuthorsError,
  selectAuthorsLoading,
  updateAuthor,
} from "../../../features/authorsSlice";
import { useEffect } from "react";
import { alertAdded } from "../../../hooks/alertAdded";
import { alertEdited } from "../../../hooks/alertEdited";
import { Navigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
const authorsSchema = yup.object().shape({
  name: yup.string().required("Name is a required !!!"),
  surname: yup.string().required("surname is a required !!!"),
  info: yup.string().required("info is a required !!!"),
});
export const AddAndEditAuthors = () => {
  const dispatch = useDispatch();
  const authorId = +useParams().id;
  const authorsLoading = useSelector(selectAuthorsLoading);
  const authorsError = useSelector(selectAuthorsError);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(authorsSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (authorId) {
      dispatch(getAuthorById(authorId))
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
  }, [dispatch, authorId, setValue, reset]);
  const onSubmitHandler = (author) => {
    if (!authorId) {
      dispatch(newAuthor(author));
      alertAdded("Author");
      reset();
    } else {
      alertEdited("Author", () =>
        dispatch(updateAuthor({ author, id: authorId }))
      );
    }
  };
  return (
    <>
      {authorsLoading ? (
        <MySpinnerLoader loading={authorsLoading} />
      ) : authorsError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="new-film">
          <h2 className="text-center">
            {authorId ? "Edit Author" : "Add Author"}
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
