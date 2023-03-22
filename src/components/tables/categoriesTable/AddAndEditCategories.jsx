import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getCategoryById,
  newCategories,
  updateCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from "./../../../features/categoriesSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { alertAdded } from "./../../../hooks/alertAdded";
import { alertEdited } from "./../../../hooks/alertEdited";
import { MySpinnerLoader } from "./../../UI/spinnerLoader/MySpinnerLoader";
import { Navigate } from "react-router-dom";
const categoriesSchema = yup.object().shape({
  name: yup.string().required("Name is a required !!!"),
});
export const AddAndEditCategories = () => {
  const dispatch = useDispatch();
  const categoriesId = +useParams().id;
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const categoriesError = useSelector(selectCategoriesError);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(categoriesSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (categoriesId) {
      dispatch(getCategoryById(categoriesId))
        .unwrap()
        .then((r) => {
          setValue("name", r.name);
        })
        .catch((e) => console.log(e));
    } else {
      reset();
    }
  }, [dispatch, categoriesId, setValue, reset]);
  const onSubmitHandler = (category) => {
    if (!categoriesId) {
      dispatch(newCategories(category));
      alertAdded("Categories");
      reset();
    } else {
      alertEdited("Categories", () =>
        dispatch(updateCategories({ category, id: categoriesId }))
      );
    }
  };
  return (
    <>
      {categoriesLoading ? (
        <MySpinnerLoader loading={categoriesLoading} />
      ) : categoriesError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="new-film">
          <h2 className="text-center">
            {categoriesId ? "Edit Category" : "Add Category"}
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
