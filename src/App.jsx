import { useReducer } from "react";
import DigitBtn from "./components/DigitBtn";
import OperandBtn from "./components/OperandBtn";

export const ACTIONS = {
  add_digit: "add_digit",
  choose_operation: "choose_operation",
  clear: "clear",
  remove_digit: "remove_digit",
  evaluate: "evaluate",
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.add_digit:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand == null)
        return {
          ...state,
          currentOperand: ".",
        };
      if (payload.digit === "." && state.currentOperand.includes("."))
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}`,
        };

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.choose_operation:
      if (state.previousOperand == null && state.currentOperand == null)
        return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: payload.digit,
      };
    case ACTIONS.evaluate:
      if (
        state.previousOperand == null ||
        state.operation == null ||
        state.currentOperand == null
      )
        return state;

      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      };

    case ACTIONS.clear:
      return {};

    case ACTIONS.remove_digit:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          previousOperand: null,
          currentOperand: null,
        };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
};

const evaluate = ({ operation, currentOperand, previousOperand }) => {
  const current = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if (isNaN(current) || isNaN(prev)) return "";
  let result = "";

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
  }
  return result.toString();
};

const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
const fomrateOperand = (operand) => {
  if (operand == null) return;
  operand = operand.toString();
  const [integer, decimal] = operand.split(".");

  if (decimal == null) return INTEGER_FORMATER.format(integer);

  return `${INTEGER_FORMATER.format(integer)}.${decimal}`;
};
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <>
      <div className="container">
        <div className="calculator grid">
          <div className="screen">
            <small className="prev-operand">
              {fomrateOperand(previousOperand)}
              {operation}
            </small>
            <div className="current-operand">
              {fomrateOperand(currentOperand)}
            </div>
          </div>
          <button
            onClick={() => dispatch({ type: ACTIONS.clear })}
            className="functions"
          >
            Ac
          </button>
          <button
            className="functions"
            onClick={() => dispatch({ type: ACTIONS.remove_digit })}
          >
            Del
          </button>
          <OperandBtn type="operation" operation={"%"} dispatch={dispatch} />
          <OperandBtn type="operation" operation={"+"} dispatch={dispatch} />

          <DigitBtn type={"digit"} digit={7} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={8} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={9} dispatch={dispatch} />
          <OperandBtn type="operation" operation={"-"} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={4} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={5} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={6} dispatch={dispatch} />

          <OperandBtn type="operation" operation={"*"} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={1} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={2} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={3} dispatch={dispatch} />

          <OperandBtn type="operation" operation={"/"} dispatch={dispatch} />

          <DigitBtn type={"digit"} digit={0} dispatch={dispatch} />
          <DigitBtn type={"digit"} digit={"."} dispatch={dispatch} />

          <button
            className="opration span-two equal"
            onClick={() => dispatch({ type: ACTIONS.evaluate })}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
