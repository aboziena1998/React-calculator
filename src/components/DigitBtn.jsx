import React from "react";
import { ACTIONS } from "../App";

const DigitBtn = ({ digit, type, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.add_digit, payload: { digit: digit } })
      }
      className={type}
    >
      {digit}
    </button>
  );
};

export default DigitBtn;
