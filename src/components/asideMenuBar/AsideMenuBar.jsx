import { Link } from "react-router-dom";
import "./asideMenuBar.scss";
export const AsideMnuBar = () => {
  return (
    <>
      <a className="aside-menu-title" href="/">
        <i className="fa-solid fa-user"></i>
        <span>Admin Dashboard</span>
      </a>
      <ul className="aside-nav">
        <li className="aside-nav-list mt-2">
          <Link to={"/categories"}>
            <i className="fa-sharp fa-solid fa-video"></i>{" "}
            <span>Categoryies</span>{" "}
          </Link>
        </li>
        <li className="aside-nav-list mt-2">
          <Link to={"/genres"}>
            <i className="fa-solid fa-photo-film"></i> <span>Genres</span>
          </Link>
        </li>
        <li className="aside-nav-list mt-2">
          <Link to={"/countries"}>
            <i className="fa-solid fa-earth-americas"></i>{" "}
            <span>Countries</span>
          </Link>
        </li>
        <li className="aside-nav-list mt-2">
          <Link to={"/actors"}>
            <i className="fa-solid fa-users"></i> <span>Actros</span>
          </Link>
        </li>
        <li className="aside-nav-list mt-2">
          <Link to={"/authors"}>
            <i className="fa-sharp fa-solid fa-user-secret"></i>
            <span>Authors</span>
          </Link>
        </li>
        <li className="aside-nav-list mt-2">
          <Link to="/films">
            <i className="fa fa-film"></i>
            <span>Films</span>
          </Link>
        </li>
        <li className="aside-nav-list mt-2">
          <Link to="/series">
            <i className="fa fa-television"></i>
            <span>Series</span>
          </Link>
        </li>
      </ul>
    </>
  );
};
