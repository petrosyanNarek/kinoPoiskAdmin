import "./PaginationMenuBar.scss";
import { useState } from "react";

export const PaginationMenuBar = ({
  pagItems,
  initialValues,
  setInitialValues,
}) => {
  const [activePage, setActivePage] = useState(1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center m-0">
        <li className="page-item">
          <button
            className="page-link pagination-prev-next"
            onClick={() => {
              if (activePage > 1) {
                setActivePage(activePage - 1);
                setInitialValues({ ...initialValues, page: activePage - 1 });
              } else {
                setActivePage(pagItems.length);
                setInitialValues({ ...initialValues, page: pagItems.length });
              }
            }}
          >
            Previous
          </button>
        </li>
        <li>
          <ul className="paginatino-item">
            {pagItems.map((item, i) => {
              return (
                <li className="page-item" key={i + 1}>
                  <button
                    className="page-link "
                    id={i + 1 === activePage ? "pagination-active" : ""}
                    onClick={() => {
                      setActivePage(i + 1);
                      setInitialValues({ ...initialValues, page: i + 1 });
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>

        <li className="page-item">
          <button
            className="page-link pagination-prev-next"
            onClick={(e) => {
              if (activePage < pagItems.length) {
                setActivePage(activePage + 1);
                setInitialValues({ ...initialValues, page: activePage + 1 });
              } else {
                setActivePage(1);
                setInitialValues({ ...initialValues, page: 1 });
              }
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
