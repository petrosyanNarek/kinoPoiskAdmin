import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectLoginUser,
  selectUserError,
} from "../features/userSlice";
export const Admin = () => {
  const user = useSelector(selectLoginUser);
  const userError = useSelector(selectUserError);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(localStorage.getItem("id")))
      .unwrap()
      .then((r) => {
        setResponse(true);
      })
      .catch((e) => setResponse(false));
  }, [dispatch]);
  if (response) {
    if (user) {
      if (user.id) {
        return <Outlet />;
      } else if (userError) {
        return <Navigate to="/error500" replace={true} />;
      } else {
        localStorage.clear("id");
        return <Navigate to="/signIn" replace={true} />;
      }
    } else {
      localStorage.clear("id");
      return <Navigate to="/signIn" replace={true} />;
    }
  } else if (response === false) {
    return <Navigate to="/error500" replace={true} />;
  }
};
