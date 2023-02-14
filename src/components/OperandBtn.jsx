import React from "react";
import { ACTIONS } from "../App";

const OperandBtn = ({ type, dispatch, operation }) => {
  return (
    <button
      className={type}
      onClick={() =>
        dispatch({ type: ACTIONS.choose_operation, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperandBtn;
