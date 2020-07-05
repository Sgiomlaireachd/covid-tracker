import React from "react";
import "./Card.css";
import CountUp from "react-countup";

export default ({ cardType, cases, lastChecked }) => {
  return (
    <div className={"card " + cardType.toLowerCase()}>
      <div className="card-header">{cardType}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h5>
            <CountUp start={0} end={cases} duration={2} separator=","></CountUp>
          </h5>
        </li>
        <li className="list-group-item">
          <strong>Last updated: </strong>
          {lastChecked}
        </li>
      </ul>
    </div>
  );
};
