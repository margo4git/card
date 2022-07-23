import React, { useState } from "react";
import classes from "./number.module.css";

export const Number = ({ number, index }) => {
  return (
    <span className={classes.numberContainer}>
      <span
        className={`${classes.number} ${number ? classes.numberVisible : ""}`}
      >
        {number}
      </span>
      <span
        className={
          classes.noneNumber + ` ${number ? classes.noneNumberHidden : ""}`
        }
      >
        #
      </span>
    </span>
  );
};
