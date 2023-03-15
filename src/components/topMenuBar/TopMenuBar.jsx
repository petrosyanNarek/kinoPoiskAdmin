import "./topMenuBar.scss";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectLoginUser } from "../../features/userSlice";

export const TopMenuBar = () => {
  const user = useSelector(selectLoginUser);
  const dispatch = useDispatch();
  return (
    <div className="top-menu-bar">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid gap-1">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primery serach-btn" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div className="dropdown">
            <a
              className="btn btn-secondary dropdown-toggle"
              href="/"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.name} <i className="fa-solid fa-user"></i>
            </a>
            <ul
              className="dropdown-menu log-out"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <button
                  className="btn dropdown-item"
                  onClick={() => {
                    localStorage.clear("id");
                    dispatch(logOut());
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
