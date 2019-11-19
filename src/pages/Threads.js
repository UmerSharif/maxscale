import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Threads.scss";
import Load from "../components/Graphs/Load";
export default function Threads() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get(
        "http://54.229.207.205:8989/v1/maxscale/threads",
        {
          auth: {
            username: "user2",
            password: "hotloaf58"
          }
        }
      );
      const { data } = result.data;
      setData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 1000);

    // return () => clearInterval(intervalId);
    fetchData();
  }, []);
  console.log(data);

  const LoadRenderedData = data.map((obj, index) => {
    //destructuring
    const {
      attributes: {
        stats: {
          load: { last_second }
        }
      }
    } = obj;

    return <Load last_second={last_second} key={index} />;
  });

  return (
    <div className="threads">
      <div className="main-header__thread">
        <div className="main-header__heading">Hello User</div>
        <div className="main-header__updates">Recent Items</div>
      </div>
      <div className="graph__container"> {LoadRenderedData}</div>
    </div>
  );
}
