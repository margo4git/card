import React, { useState } from "react";
import classes from "./letter.module.css";

export const Letter = ({ letter }) => {
  if (letter !== " ") return <span className={classes.letter}>{letter}</span>;
  return <span className={classes.letter}>&nbsp;</span>;
};
