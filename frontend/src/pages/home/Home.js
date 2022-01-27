import React from "react";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="filter">
        <label>
          Location:{" "}
          <select>
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
          <select>
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
          <tr>
            <td>England</td>
            <td>24 jun 2019</td>
            <td>Temperature</td>
            <td>2</td>
          </tr>
          <tr>
            <td>England</td>
            <td>24 jun 2019</td>
            <td>Temperature</td>
            <td>2</td>
          </tr>
          <tr>
            <td>England</td>
            <td>24 jun 2019</td>
            <td>Temperature</td>
            <td>2</td>
          </tr>
          <tr>
            <td>England</td>
            <td>24 jun 2019</td>
            <td>Temperature</td>
            <td>2</td>
          </tr>
          <tr>
            <td>England</td>
            <td>24 jun 2019</td>
            <td>Temperature</td>
            <td>2</td>
          </tr>
          <tr>
            <td>England</td>
            <td>24 jun 2019</td>
            <td>Temperature</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
