import React from "react";
import Data from "../components/Data";
import "./App.css";
import ReactPaginate from "react-paginate";

export default function App() {
  const [toDoData, setToDoData] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [pageNumber, setPageNumber] = React.useState(0);

  const datasPerPage = 10;
  const postsPerPage = 10;
  const firstIndex = pageNumber * postsPerPage;
  const lastIndex = firstIndex + datasPerPage;

  React.useEffect(function () {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then((res) => res.json())
      .then((data) => {
        setToDoData(data);
      });
  }, []);

  // filter data for displaying
  const filteredData = React.useMemo(() => {
    if (activeFilter === "all") return toDoData;

    if (activeFilter === "completed")
      return toDoData.filter((data) => data.completed);

    if (activeFilter === "not-completed")
      return toDoData.filter((data) => !data.completed);

    throw new Error(`Unknown filter '${activeFilter}'`);
  }, [toDoData, activeFilter]);

  const renderedData = filteredData.slice(firstIndex, lastIndex).map((item) => {
    return (
      <Data
        key={item.id}
        userId={item.userId}
        title={item.title}
        completed={item.completed ? "true" : "false"}
      />
    );
  });

  const totalPage = Math.ceil(filteredData.length / datasPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="btn">
        <button
          className="option--btn"
          onClick={() => setActiveFilter("completed")}
        >
          Completed
        </button>
        <button
          className="option--btn"
          onClick={() => setActiveFilter("not-completed")}
        >
          Not Completed
        </button>
        <button className="option--btn" onClick={() => setActiveFilter("all")}>
          All
        </button>
      </div>
      <div className="data">{renderedData}</div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPage}
        onPageChange={changePage}
        containerClassName={"paging--btn"}
        previousLinkClassName={"paging--prev--btn"}
        nextLinkClassName={"paging--next--btn"}
        activeClassName={"paging--active"}
        disabledClassName={"paging--disable"}
      />
    </div>
  );
}
