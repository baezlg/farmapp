import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Home.scss";

const Home = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [itemCount, setItemCount] = useState(null);
  const [filter, setFilter] = useState({
    sensorType: "",
    location: "",
  });

  useEffect(() => {
    const getFarms = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/farms?${
          filter.location !== "" ? `location=${filter.location}` : " "
        }${
          filter.sensorType !== "" ? `&sensorType=${filter.sensorType}` : ""
        }&page=${page}`
      );
      setItems(data.data);
      setItemCount(data.totalFarms);
      setTotalPage(data.pages);
      console.log(data);
    };
    getFarms();
  }, [page, filter.location, filter.sensorType]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <div className="home">
      <div className="filter">
        <label>
          Location:{" "}
          <select
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          >
            <option value="">all</option>
            <option value="Friman Metsola collective">
              Friman Metsola collective
            </option>
            <option value="Organic Ossi's Impact That Lasts plantase">
              Organic Ossi's Impact That Lasts plantase
            </option>
            <option value="PartialTech Research Farm">
              PartialTech Research Farm
            </option>
            <option value="Noora's farm">Noora's farm</option>
          </select>
        </label>
        <label>
          sensorType:{" "}
          <select
            onChange={(e) =>
              setFilter({ ...filter, sensorType: e.target.value })
            }
          >
            <option value="">all</option>
            <option value="pH">pH</option>
            <option value="rainFall">rainFall</option>
            <option value="temperature">temperature</option>
          </select>
        </label>
      </div>
      <h1>Farm data</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Datetime</th>
            <th>SensorType</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i._id}>
              <td>{i.location}</td>
              <td>{new Date(i.datetime).toDateString()}</td>
              <td>{i.sensorType}</td>
              <td>{i.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={6}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pagination__item"}
        pageLinkClassName={"pagination-link"}
        previousLinkClassName={"pagination__item"}
        nextLinkClassName={"pagination__item"}
        breakClassName={"pagination__item"}
        breakLinkClassName={"pagination__item"}
        activeClassName={"pagination__item active"}
      />
    </div>
  );
};

export default Home;
