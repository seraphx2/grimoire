import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { SquishedFlexContainer } from "./utility";
import { useLayoutEffect, useState } from "react";

export default function ValueEditor(props) {
  const { id, defaultValue, min, max, callback } = props;
  const [newValue, setNewValue] = useState(0);
  const [hasMinedOut, setMinedOut] = useState(min === defaultValue);
  const [hasMaxedOut, setMaxedOut] = useState(max === defaultValue);

  function subtractValueAndRunCallback() {
    let updatedValue = newValue - 1;

    evaluateBoundaries(updatedValue);

    setNewValue(updatedValue);
    if (callback) callback(updatedValue);
  }

  function addValueAndRunCallback() {
    let updatedValue = newValue + 1;

    evaluateBoundaries(updatedValue);

    setNewValue(updatedValue);
    if (callback) callback(updatedValue);
  }

  function evaluateBoundaries(updatedValue) {
    if (min === updatedValue) setMinedOut(true);
    else setMinedOut(false);
    if (max === updatedValue) setMaxedOut(true);
    else setMaxedOut(false);
  }

  useLayoutEffect(() => {
    const runEffect = async () => {
      setNewValue(defaultValue);
    };
    runEffect();
  }, [defaultValue, setNewValue]);

  return (
    <SquishedFlexContainer>
      <IconButton
        disabled={hasMinedOut}
        color={hasMinedOut ? "disabled" : "primary"}
        size="small"
        onClick={subtractValueAndRunCallback}
      >
        <RemoveIcon />
      </IconButton>
      <span id={id} style={{ margin: 5, textAlign: "center", width: 16 }}>
        {newValue}
      </span>
      <IconButton
        disabled={hasMaxedOut}
        color={hasMaxedOut ? "disabled" : "primary"}
        size="small"
        onClick={addValueAndRunCallback}
      >
        <AddIcon />
      </IconButton>
    </SquishedFlexContainer>
  );
}
