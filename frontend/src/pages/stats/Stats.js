import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Stats.scss";

const Stats = () => {
  const [farmsTotals, setFarmsTotals] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [statsBySensorType, setStatsBySensorType] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const months = [
    "start",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  useEffect(() => {
    const fetchfarmsTotals = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/farms/stats/by-location"
        );
        setFarmsTotals(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchfarmsTotals();
  }, []);

  useEffect(() => {
    const getMonthlyStats = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/farms/stats/monthly-stats/${startDate.getFullYear()}`
        );
        console.log(startDate.getFullYear());
        setMonthlyStats(
          data.map((m) => {
            return { ...m, month: months[m.month] };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getMonthlyStats();
  }, [startDate, startDate.getFullYear]);
  useEffect(() => {
    const getStatsBySensorType = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/farms/stats/by-sensortype`
        );
        setStatsBySensorType(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatsBySensorType();
  }, []);
  return (
    <section className="stats">
      <div className="stats__farms">
        {farmsTotals?.map((ft) => (
          <div className="stats__farms-box" key={ft.location}>
            <h2 className="stats__farms-name">{ft.location}</h2>
            <p className="stats__farms-total">{ft.numFarms}</p>
          </div>
        ))}
      </div>
      <div className="stats__monthly-stats">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showYearPicker
          dateFormat="yyyy"
          yearItemNumber={9}
          className="stats__monthly-stats-datepicker"
        />
        <h1 className="stats__monthly-stats-heading">
          Showing stats for {startDate.getFullYear()}
        </h1>
        {monthlyStats?.length > 0 ? (
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={monthlyStats}>
              <XAxis dataKey={`month`} stroke="#fff" />
              <Line type="monotone" dataKey="numFarms" stroke="#000" />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <h3>No monthly stats for {startDate.getFullYear()}</h3>
        )}
      </div>
      <div className="stats__by-fields">
        <div className="stats__by-location">
          <h3 className="heading">Stats by Location</h3>
          {farmsTotals?.map((sl) => (
            <ul key={sl.location}>
              <li>
                <span>Location</span>: {sl.location}
              </li>
              <li>
                <span>Min value</span>: {sl.minValue}
              </li>
              <li>
                <span>Max value</span>: {sl.maxValue}
              </li>
              <li>
                <span>Average value</span>: {sl.avgValue.toFixed(2)}
              </li>
              <li>
                <span>Number of farms</span>: {sl.numFarms}
              </li>
            </ul>
          ))}
        </div>
        <div className="stats__by-sensortype">
          <h3 className="heading">Stats by sensortype</h3>
          {statsBySensorType?.map((sl) => (
            <ul key={sl.location}>
              <li>
                <span>Sensor type</span>: {sl.sensorType}
              </li>
              <li>
                <span>Min value</span>: {sl.minValue}
              </li>
              <li>
                <span>Max value</span>: {sl.maxValue}
              </li>
              <li>
                <span>Average value</span>: {sl.avgValue.toFixed(2)}
              </li>
              <li>
                <span>Number of farms</span>: {sl.numFarms}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
