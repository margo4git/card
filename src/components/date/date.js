import React, { useEffect, useState } from "react";

import classes from "./date.module.css";

export const DateY = ({ date, prevDate }) => {
  console.log(date, prevDate);
  const [isDate, setDate] = useState(false);

  return (
    <span className={classes.dateContainer}>
      <p className={classes.element}>{date}</p>

      {/* <span
        className={
          classes.oldDate + ` ${date !== prevDate ? classes.oldDateHidden : ""}`
        }
      >
        {prevDate}
      </span> */}
    </span>
  );
};
