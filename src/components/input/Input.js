import React from "react";
import classes from "./input.module.css";

export const Input = ({ label = "", ...props }) => {
  return (
    <div className={classes.container}>
      <span>{label}</span>
      <input {...props} />
    </div>
  );
};
